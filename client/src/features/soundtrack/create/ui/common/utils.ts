export const dropzoneFeedbackColor = (props: {
  isError: boolean
  isDragAccept: boolean
  isDragReject: boolean
}) => {
  if (props.isDragReject) return '#ff1744'
  if (props.isDragAccept) return '#00e676'
  if (props.isError) return '#ff1744'
}
