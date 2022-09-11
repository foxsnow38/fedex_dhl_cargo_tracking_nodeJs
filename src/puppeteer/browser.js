import  puppeteer  from "puppeteer"
import waitHtmlPage from "../utils/waitHtmlPage.js"



const browser = async  () =>{



    
let browser
let page




const browserStart = async (link= `https://www.google.com/`) =>{
    browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-dev-shm-usage',
        `--no-sandbox`, '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--disable-site-isolation-trials',
        '--no-first-run',
        '--lang="en-US"'
    ]
    })
    page=await browser.newPage()

    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8',
        'cookie': "JSESSIONID=BB56990DB2E00ECDC285239DAE687F02; __VCAP_ID__=ef4b64b1-f9ea-466b-70f4-b939; siteDC=edc; fdx_cbid=31378984441662813876118880071131; fdx_redirect=tr-tr; cc_path=tr; bm_sz=E2E0D4186C73639333347AABD2DF35B1~YAAQlLGvw6BVRgCDAQAAQDNuJxGSIGd89cWs+5WhhluoduBrU9tC4uJFwQvKSXdc0GFKRXJPrTfel1itKP02Bn+6nfbHASch+NNO6rhKPK//C9shidWQJHbFP1YIvOyZnhm1uod2KUtpnFfLTmtG2qyVqVk8ybACI/3eSAQcgMI8sesj7wvTDZbvbRBGAeiiLeOjxZbBTSx5E0M3yePK2fIeTfiaDpDWzzGUt4kxtUEKT2NQlZd7yAjaHMU29Lr11BGv5T6deYQqOO4QJ7GBSKusJwxWxFECCL9KLmRrU/sWkw==~4405315~4277304; gdl-clientId=fee9fb41-1e18-41e9-9f90-f47dc06ac55d; s_invisit=true; g_sref=www.google.com/; g_stime=1662813880933; s_vnum=1662843599999&vn=1; at_check=true; AMCVS_1E22171B520E93BF0A490D44%40AdobeOrg=1; gpv_pageName=fedex/home; s_cc=true; ak_bmsc=9A5715B14F0DD15ECA425093981EA2D9~000000000000000000000000000000~YAAQnrGvwzYjy/aCAQAAbDdxJxFqleFK1kbuLb3lqjTxMW0M6LgTOava9SRWS56zIuuNqWbmgpGt7Kk7ve34LyyFP5TerrVrV6AVCUeB96MUDp5dY6H1hKEt0H9YtZGHtwVxTeOqkvMAdPiVOl+sznUSUMwcmfrQ0R3NhS0u8GL92qUGkTn7FP8VWGD883h3A0MqOUoSwyKf5f6Qcr311uiIYSGDXz7n7e8Lc9sS3C1X+LQI35W2UMUcXGewutAurgkqTtLJYTH5oXMmL/UDOXD9ubsOUD3ZEzD8mmBwirD7Xrpt9HCzSutys4REasFFvzEA/XLNwZ+W2/KiFUHxE89tc/hr/Fat0SR44XaYHHC7k913Kkeqfz3yYPf1ZHPLfaJB9WyGOyh/14cilYEuco9jyOzykLMMaj4=; xacc=DE; isTablet=false; isMobile=false; isWireless=false; bm_mi=FC14A86C1342DC4A735215915A6CF544~YAAQfCV+aM5L4SGDAQAAQ2h3JxHKRoECJAYc7zzPybhp2ugNRGdaKG3lLt1jou4E6A0Lf00hzFXeAJql4StP1KfQxtWDTEZxfMtEfmbh+akbAFDM5HnZizniP+G1qkz2wwlz2WbxvoU3+vF+Vx0MwH/RagLGm15S7Myoh/ERH5L4+FaCHzCzwLrbaC/pDRO0tByL/IQqAFJxEfGkejlEj4ZiVxwuvvG/EPDMLu+9ES1wQlmsS4/G1TNVD0z75SeYVxdXE4iIIFb7n1FaKv11h8OI0855ijpBbXVcjEyunxOIh6DBoZQ7vZpaSyV7e6t5t4jnJidDKsHbOAn0~1; aemserver=PROD-P-dotcom-p0008435.prod.cloud.fedex.com; mbox=session#230c3908a31b4c45845e1902751a1c3d#1662816345; SameSite=None; fdx_locale=tr_TR; setLink=fedex/home^^hero|Track^^fedex/home%20|%20hero|Track^^false^^true; s_sq=%5B%5BB%5D%5D; AMCV_1E22171B520E93BF0A490D44%40AdobeOrg=359503849%7CMCIDTS%7C19246%7CMCMID%7C46859348741493427252036859844830471356%7CMCAID%7CNONE%7CMCOPTOUT-1662821688s%7CNONE%7CvVersion%7C5.0.1; bm_sv=77A600D67B987F9357D6611F0B41AA10~YAAQtSV+aCUB9ACDAQAAl4p3JxHJLDOv7rBCbfGwohLn1N4/7lcxXKK5PACWaBPSbbCfn5k50pYzTjIdm3U8dCX5kJCzh/dLpQ3bwfv+Y0on01bbJSTdIfJhc3FalWpACZmYEv3nn5J492edQUANTdi1oPjFpz/px9YQ+IxBw9XLKquvjFV2VCSWDfEtYvEV4XGvNNqPOQt1hqMkEE5NgPYkqsLcB4PuiZP657ZjcYdpjbAm4VItapqocFjjDk+Y~1; _abck=D46697708F22DF0CC613012D851E5140~0~YAAQfCV+aGhM4SGDAQAAbpp3Jwjhxkfh6rBjkfJgshcSnAAw80fLL69YgxTgoKs6BL349wESj7UdUXzpa4ViMgRMnWmsJPZcPSSCvxCxL28d8jhFaS2hJqQD8gAephcr/87d/0yFc/gnRHDt3WISz8ECUZPT794xaA/VJOxmzU4FWUN8/p79eG99/eaE3RVr/wrQ26zee+Eh0UHOapTB4g0l7JbOSWhj6uoOrIVpIzibmfRD2AZ3x9lYT1KikHHyCk/CGfwiSHctsou06h/1Uak3QSxfOUMZg9UIZSHKZ3YeEY44bn2VXJ6Vfat+wclMc5D3K3SfMLjks2QKLEnw5RqGoQX3Yk8FRlOeTQd1ph0x1bleD47pSrEHolC8iGPFaIDUJx/4CIyvYp5smCiPGkWxm7c=~-1~-1~-1"
    })
    await page.setViewport(
        {width:1500,
        height:1000}
    )
    
    await page.goto(`${link}`)
 

}
const browserClose = async  () => await browser.close()



return { browserStart,browserClose}
}

export { browser}
