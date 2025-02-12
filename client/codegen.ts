import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8081/graphql',
  documents: './src/**/*.gql',
  ignoreNoDocuments: true,
  generates: {
    'src/shared/lib/gqlgen.types2.ts': {
      plugins: ['typescript', 'fragment-matcher'],
      config: {
        constEnums: true,
        omitDescriptions: true,
        scalars: {
          Date: {
            input: 'string',
            output: 'string'
          },
          Upload: {
            input: 'unknown',
            output: 'unknown'
          }
        }
      }
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'shared/lib/gqlgen.types2.ts',
        folder: '_gen2_'
      },
      plugins: ['typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        gqlImport: 'urql#gql',
        defaultScalarType: 'unknown'
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  }
}

export default config
