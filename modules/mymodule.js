// ให้บริการการทำงานต่างๆในโปรเจคค์

getCurrentTime = ()=>{
    return new Date()
}

add = (x,y) =>{
    return x+y
}

formatNumber = (num)=>{
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// ส่งไปใช้งานในไฟล์ด้านนอก
module.exports.getCurrentTime = getCurrentTime
module.exports.add = add
module.exports.formatNumber = formatNumber