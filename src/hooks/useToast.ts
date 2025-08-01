import { useToast as useToastOriginal } from "@/hooks/use-toast"

export const useToast = useToastOriginal

// Toast helper functions for common use cases
export const showSuccessToast = (title: string, description?: string) => {
  return useToastOriginal().toast({
    title,
    description,
    variant: "default",
  })
}

export const showErrorToast = (title: string, description?: string) => {
  return useToastOriginal().toast({
    title,
    description,
    variant: "destructive",
  })
}

export const showInfoToast = (title: string, description?: string) => {
  return useToastOriginal().toast({
    title,
    description,
    variant: "default",
  })
}