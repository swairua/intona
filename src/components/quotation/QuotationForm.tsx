import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Upload, CheckCircle2 } from 'lucide-react'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { submitQuotation } from '../../api/quotation'
import { getServices } from '../../api/services'
import type { Service } from '../../types'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone is required'),
  projectType: z.string().min(1, 'Select a project type'),
  budget: z.string().min(1, 'Select a budget range'),
  timeline: z.string().min(1, 'Timeline is required'),
  description: z.string().min(20, 'Please provide more detail about your project'),
})

type FormData = z.infer<typeof schema>

const BUDGET_RANGES = ['Under $50K', '$50K – $100K', '$100K – $500K', '$500K – $1M', '$1M – $5M', '$5M+']
const TIMELINES = ['ASAP', '1-3 Months', '3-6 Months', '6-12 Months', '12+ Months']

export function QuotationForm() {
  const [services, setServices] = useState<Service[]>([])
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => { getServices().then(setServices).catch(() => {}) }, [])

  const onSubmit = async (data: FormData) => {
    await submitQuotation(data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl md:text-3xl font-bold text-accent mb-2">Request Received!</h3>
        <p className="text-secondary">Thank you for your inquiry. Our team will review your project details and get back to you within 24 hours with a comprehensive quotation.</p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-8 md:p-12 border border-border shadow-sm"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-accent mb-2">Request a Quotation</h3>
      <p className="text-secondary mb-8">
        Fill in the details below and our team will get back to you within 24 hours.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input id="name" label="Full Name *" placeholder="Your full name" error={errors.name?.message} {...register('name')} />
          <Input id="company" label="Company" placeholder="Company name (optional)" {...register('company')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input id="email" type="email" label="Email Address *" placeholder="your@email.com" error={errors.email?.message} {...register('email')} />
          <Input id="phone" type="tel" label="Phone Number *" placeholder="+256 700 000 000" error={errors.phone?.message} {...register('phone')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label htmlFor="projectType" className="block text-sm font-medium text-accent">Project Type *</label>
            <select
              id="projectType"
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-accent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register('projectType')}
            >
              <option value="">Select type</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
            {errors.projectType && <p className="text-sm text-red-500 mt-1">{errors.projectType.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="budget" className="block text-sm font-medium text-accent">Budget Range *</label>
            <select
              id="budget"
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-accent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register('budget')}
            >
              <option value="">Select budget</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="timeline" className="block text-sm font-medium text-accent">Timeline *</label>
            <select
              id="timeline"
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-accent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              {...register('timeline')}
            >
              <option value="">Select timeline</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.timeline && <p className="text-sm text-red-500 mt-1">{errors.timeline.message}</p>}
          </div>
        </div>

        <Textarea id="description" label="Project Description *" placeholder="Describe your project in detail — scope, requirements, special considerations..." error={errors.description?.message} {...register('description')} />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-accent">Attachments (optional)</label>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <p className="text-sm text-secondary">Drop files here or click to upload</p>
            <p className="text-xs text-secondary/60 mt-1">PDF, DWG, PNG — Max 20MB</p>
          </div>
        </div>

        <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto shadow-xl shadow-primary/25">
          <Send className="w-4 h-4 mr-2" />
          Submit Quotation Request
        </Button>
      </div>
    </motion.form>
  )
}
