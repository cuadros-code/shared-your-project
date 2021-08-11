
export const formatDate = ( date ) => {
  return new Intl.DateTimeFormat('es-ES',{
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}