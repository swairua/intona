import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { submitContact } from '../../api/contact'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await submitContact(data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-accent mb-2">Message Sent!</h3>
        <p className="text-secondary">Thank you for reaching out. We'll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm"
    >
      <h3 className="text-2xl font-bold text-accent mb-6">Send Us a Message</h3>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input id="name" label="Full Name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
          <Input id="email" type="email" label="Email Address" placeholder="your@email.com" error={errors.email?.message} {...register('email')} />
        </div>
        <Input id="subject" label="Subject" placeholder="How can we help?" error={errors.subject?.message} {...register('subject')} />
        <Textarea id="message" label="Message" placeholder="Tell us about your project..." error={errors.message?.message} {...register('message')} />
        <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </motion.form>
  )
}
