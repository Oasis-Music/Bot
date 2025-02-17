package postgres

import (
	"context"
	"errors"
	"fmt"
	"log"
	"oasis/api/internal/services/soundtrack/entities"
	"oasis/api/internal/utils"
	"strconv"
)

const (
	SOUNDTRACKS_QUERY = `
	SELECT
	  id,
	  title,
	  author,
	  duration,
	  cover_image,
	  audio_file,
	  creator_id,
	  updated_at,
	  created_at,
	  EXISTS(SELECT TRUE FROM user_soundtrack WHERE soundtrack_id = s.id AND user_soundtrack.user_id = $1) AS attached
  	FROM soundtrack s
	`
)

func (s *storage) Soundtracks(ctx context.Context, limit int64, after int64, before int64, filter entities.SoundtrackFilter, userID int64) (*entities.SoundtrackConnection, error) {

	showLog := true

	if limit <= 0 {
		return nil, errors.New("limit is zero or negative")
	}

	if after < 0 || before < 0 {
		return nil, errors.New("cursor cannot be negative")
	}

	if after > 0 && before > 0 {
		return nil, errors.New("impossible to use forward and backward pagination simultaneously")
	}

	dbQuery, values := soundtracksQueryGenerator(SOUNDTRACKS_QUERY, limit+1, after, before, filter, showLog, userID)

	rows, err := s.db.Query(ctx, dbQuery, values...)
	if err != nil {
		log.Println("DB: soundtracks", err)
		return nil, err
	}

	defer rows.Close()

	var items []SoundtrackDB

	for rows.Next() {
		var i SoundtrackDB
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Author,
			&i.Duration,
			&i.CoverImage,
			&i.AudioFile,
			&i.CreatorID,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.Attached,
		); err != nil {
			log.Println("db: soundtracks rows.Next", err)
			return nil, err
		}
		items = append(items, i)
	}

	if err := rows.Err(); err != nil {
		log.Println("db: soundtracks rows.Err()", err)
		return nil, err
	}

	var soundtracks []entities.Soundtrack

	if before != 0 {
		// ORDER BY ... ASC the result will be from greater to lesser,
		// and you need from smaller to larger id(34..35..36..37)
		// it's like sorting

		for i := len(items) - 1; i >= 0; i-- {
			soundtracks = append(soundtracks, buildSoundtrackEntity(items[i]))
		}

	} else {
		for _, item := range items {
			soundtracks = append(soundtracks, buildSoundtrackEntity(item))
		}
	}

	if showLog {
		fmt.Println("got soundtracks with +1 ", len(soundtracks))

		showStr := ""
		for _, v := range soundtracks {
			showStr += " ID-" + utils.IntToString(v.ID)
		}
		fmt.Println(showStr)
	}

	fetchedDataLen := len(soundtracks)

	var hasNext, hasPrev bool

	// "hasNext" when moving the cursor back
	if before != 0 {

		fmt.Println("fetchedDataLen:", fetchedDataLen)

		if fetchedDataLen > 0 {
			hasNext = true
			// If you received the slice greater than the limit
			// So we are on the penultimate "hasNextFlag" and we need to remove the entity
			// from the slice which is (limit + 1) in the reverse sort format
			if fetchedDataLen > int(limit) {
				hasPrev = true
				soundtracks = soundtracks[1:]
			}

		}

		// after > 0 or after/before zero cases
	} else {
		if fetchedDataLen > 0 {
			if fetchedDataLen > int(limit) {
				hasNext = true
				// remove that same "limit+1" at the end
				soundtracks = soundtracks[:fetchedDataLen-1]
			}

			if after != 0 {
				hasPrev = true
			}
		}

	}

	if showLog {
		fmt.Println("final soundtracks len", len(soundtracks))
	}

	return &entities.SoundtrackConnection{
		TotalCount:  0, // todo del then
		Soundtracks: soundtracks,
		HasNextPage: hasNext,
		HasPrevPage: hasPrev,
	}, nil
}

func soundtracksQueryGenerator(query string, limit int64, after int64, before int64, filter entities.SoundtrackFilter, showLog bool, userID int64) (string, []interface{}) {

	var filterValues []interface{}

	if showLog {
		fmt.Printf("after: %d before: %d\n", after, before)
	}

	filterValues = append(filterValues, userID)

	query += "WHERE TRUE" // there are no values to filter yet

	if after > 0 {
		filterValues = append(filterValues, after)
		query += " AND s.id < $" + strconv.Itoa(len(filterValues))
	}

	if before > 0 {
		filterValues = append(filterValues, before)
		query += " AND s.id > $" + strconv.Itoa(len(filterValues))
	}

	// if filter.Tag != nil {
	// 	filterValues = append(filterValues, *filter.Tag)
	// 	query += " AND s.tag_name = $" + strconv.Itoa(len(filterValues))
	// }

	// If we use the back cursor then ORDER BY DESC to keep the interval
	sortMode := "DESC"
	if after == 0 && before != 0 {
		sortMode = "ASC"
	}

	query += fmt.Sprintf(" ORDER BY s.id %s LIMIT %d", sortMode, limit)

	if showLog {
		fmt.Println("filter values: ", filterValues)
	}

	return query, filterValues
}
