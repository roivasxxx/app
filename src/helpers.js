export const formatDate = (date) => {
    const parsedDate = Date.parse(date)
    const dateObject = new Date(parsedDate)
    return `${dateObject.getDate()}.${
        dateObject.getMonth() + 1
    }.${dateObject.getFullYear()}`
}

export const textStyle = 'text-purple-300 hover:text-purple-500'
