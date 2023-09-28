import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  documents: './src/**/*.gql',
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript', 'fragment-matcher']
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'graphql/types.ts',
        folder: '_gen_'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        preResolveTypes: true,
        withHooks: true,
        withRefetchFn: false,
        apolloClientVersion: 3
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write']
  }
}

export default config
