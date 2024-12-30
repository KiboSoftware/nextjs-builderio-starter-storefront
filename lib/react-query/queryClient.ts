import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query'

const getErrorMessage = (code: string, message: string) => {
  const messages: any = {
    GRAPHQL_VALIDATION_FAILED: 'Something went wrong',
    UNAUTHENTICATED: 'Invalid Credentials',
  }

  return message || messages[code]
}

const queryClientHandler = (error: any, showSnackbar: any) => {
  const status = 'error'
  if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
    //do nothing here for now
  } else {
    showSnackbar(getErrorMessage(error?.response?.code, error?.response?.message), status)
  }
}

export const generateQueryClient = (showSnackbar?: any): QueryClient => {
  const mutationCache = new MutationCache({
    onError: (error) => queryClientHandler(error, showSnackbar),
  })

  const queryCache = new QueryCache({
    onError: (error) => queryClientHandler(error, showSnackbar),
  })

  return new QueryClient({ mutationCache, queryCache })
}

export const queryClient = generateQueryClient()
