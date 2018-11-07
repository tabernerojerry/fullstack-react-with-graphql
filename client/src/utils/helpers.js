export default {
  formatDate: date => {
    const newDate = new Date(date).toLocaleDateString("my-MYS");
    const newTime = new Date(date).toLocaleTimeString("my-MYS");

    return `${newDate} at ${newTime}`;
  }
};
