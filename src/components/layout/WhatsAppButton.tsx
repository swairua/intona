import { MessageCircle } from 'lucide-react'
import { COMPANY } from '../../constants/company'

export function WhatsAppButton() {
  const phone = COMPANY.whatsapp.replace(/[^0-9]/g, '')
  const message = encodeURIComponent(`Hello ${COMPANY.name}, I'd like to inquire about your services.`)
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  )
}
