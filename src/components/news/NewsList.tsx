import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Calendar, ArrowRight } from 'lucide-react'
import { getNews } from '../../api/news'
import type { NewsItem } from '../../api/news'

export function NewsList() {
  const [articles, setArticles] = useState<NewsItem[]>([])

  useEffect(() => { getNews().then(setArticles).catch(() => {}) }, [])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article: NewsItem, i: number) => (
        <Card key={article.title} delay={i * 0.05}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="primary">{article.category}</Badge>
              <span className="text-xs text-secondary flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {article.date_published}
              </span>
            </div>
            <h3 className="text-lg font-bold text-accent mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Read More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
