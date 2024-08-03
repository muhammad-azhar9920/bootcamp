export const formatTime=(inputDate)=>{
    const date = new Date(inputDate);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };
    return date.toLocaleString('en-US',options);
}