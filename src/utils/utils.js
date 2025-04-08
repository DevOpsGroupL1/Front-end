export const formatDate= (isoDateString)=>{
  const date = new Date(isoDateString);
  return date.toISOString().split('T')[0];
}
