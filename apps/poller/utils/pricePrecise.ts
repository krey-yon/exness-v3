export function formatePrice(data: string){
  return parseFloat((parseFloat(data) * 10000).toFixed(2));
}