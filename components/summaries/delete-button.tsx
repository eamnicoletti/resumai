'use client'

import { deleteSummaryAction } from '@/actions/summary-action'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useState } from 'react' // Assuming this is a valid import
import { toast } from 'sonner' // Import directly from react-toastify

interface DeleteButtonProps {
  summaryId: string
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Loading state

  const handleDelete = async () => {
    setIsLoading(true) // Set loading to true

    const result = await deleteSummaryAction({ summaryId }) // Call delete action with summaryId

    setIsLoading(false) // Reset loading state

    if (result.success) {
      // If successful, show success toast
      toast.success('Resumo excluido com sucesso!')
      setOpen(false) // Close the dialog
    } else {
      const errorMessage = result.error || 'Failed to delete summary'

      console.log(errorMessage)

      toast.error('Falha ao excluir resumo')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          size="icon"
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-white hover:bg-red-500 hover:border-red-500" // Slightly adjusted hover color for better visibility
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Resumo</DialogTitle>
          <DialogDescription>
            Você tem certeza que quer excluir esse resumo? Essa ação não poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className="px-2 text-black bg-gray-50 border border-gray-400 hover:bg-gray-500 hover:text-white"
            onClick={() => setOpen(false)} // Close the dialog without deleting
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="bg-gray-900 hover:bg-gray-900"
            onClick={handleDelete} // Handle the delete action
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <span className="loader">Excluindo...</span> // Display loader text or spinner
            ) : (
              'Excluir'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
