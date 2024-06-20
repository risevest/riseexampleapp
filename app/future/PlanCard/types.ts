export interface PlanCardProps {
  backgroundImage?: string
  height?: number
  index: number
  onNavigate: () => void
  plan: IPlan
  planName?: string
  showPerfomance?: boolean
  width?: number
}

export interface MaturedPlanCardProps {
  index?: number
  onNavigate: () => void
  plan: IPlan
}
