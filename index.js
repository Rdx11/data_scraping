let axions = require('axios')
let cheerio = require('cheerio')
let fs = require('fs')

axions.get('http://members.qodr.or.id/')
    .then((response) => {
        // status check
        if (response.status == 200) {
            const html = response.data
            // menarik html menggunakan cheerio
            const $ = cheerio.load(html)
                // mendefinisikan penyimpanan untuk array
                    let qodrlist = []
                        // target scrapping, menggunkan cheerio
                        // scrapping pertama
                        $('.fh5co-project a').each(function(i, elem) {
                            // mengisi data ke qodrlist
                            qodrlist[i] = {
                                nama : $(this).find('h2').text().trim(),
                                status : $(this).find('p').text().trim()
                            }
                        })

                        const qodrlisttrim = qodrlist.filter( n => n != undefined )
                        fs.writeFile('data/dataSantri.json',
                        JSON.stringify(qodrlisttrim, null, 4), (err) => {
                            console.log('write scrapping is success')
                        })
        }
    }), (error) => {
        console.log(err)
    }