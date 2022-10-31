const xml2js = require('xml2js');
const ExchangeModel = require('../models')
const { SoapRequest, Constants } = require('../util')
const { CURRENCY_TYPES } = Constants

class ExchangeService {
    static async getExchanges () {
        const list = await ExchangeModel.getExchanges()
        const currencies = Object.keys(CURRENCY_TYPES)
        const result = []
        list?.length && currencies.forEach(from => {
            currencies.forEach(to => {
                if (from !== to) {
                    result.push(ExchangeService._getRate(from, to, list))
                }
            })
        })
        return result
    }

    static _getRate (from, to, list) {
        const ex = {
            currency: `${from}_${to}`
        }
        if (from === CURRENCY_TYPES.AMD) {
            const rate = list.find(c => c.currency === to).rate
            ex.rate = Math.floor(1 / rate * 10000) / 10000
        } else if (to === CURRENCY_TYPES.AMD) {
            ex.rate = list.find(c => c.currency === from).rate
        } else{
            const rateFrom = list.find(c => c.currency === from).rate
            const rateTo = list.find(c => c.currency === to).rate
            ex.rate = ex.rate = Math.floor(rateFrom / rateTo * 10000) / 10000
        }
        return ex
    }

    static async getExchangesFromCBA () {
        try {
            console.log('start get exchanges from cba')
            const headers = {
                'Content-Type': 'application/soap+xml',
            };
            const xml = `<?xml version="1.0" encoding="utf-8"?>
                     <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                       <soap12:Body>
                         <ExchangeRatesLatest xmlns="http://www.cba.am/" />
                       </soap12:Body>
                     </soap12:Envelope>`
            const url = 'http://api.cba.am/exchangerates.asmx';
            const response = await SoapRequest({ url, headers, xml }).then(async({ response }) => response)
            console.log("soap response ", !!response);
            const xmlResponse = response?.body
            const parseData = xmlResponse && await xml2js.parseStringPromise(xmlResponse)

            // console.log('body', parseData?.['soap:Envelope']?.['soap:Body']?.[0]?.ExchangeRatesLatestResponse?.[0]?.ExchangeRatesLatestResult?.[0]?.Rates?.[0]?.ExchangeRate)
            const exchanges = parseData?.['soap:Envelope']?.['soap:Body']?.[0]?.ExchangeRatesLatestResponse?.[0]?.ExchangeRatesLatestResult?.[0]?.Rates?.[0]?.ExchangeRate
            const result = exchanges.filter(e => Object.keys(CURRENCY_TYPES).some(currency => e?.ISO?.[0] === currency))
            console.log("parsed result", result);

            // const nextRequestingDate = parseData?.['soap:Envelope']?.['soap:Body']?.[0]?.ExchangeRatesLatestResponse?.[0]?.ExchangeRatesLatestResult?.[0]?.NextAvailableDate?.[0]
            // console.log('nextRequestingDate', nextRequestingDate)


            // console.log('result', result)
            // console.log('exchanges', exchanges)
            const promises = result?.map(item => {
                if (item?.ISO?.[0]) {
                    const payload = {
                        rate: item?.Rate?.[0] || 1
                    }
                    return ExchangeModel.updateExchange(item.ISO[0], payload)
                }
            })
            await Promise.all(promises)
            console.log('end get exchanges')
        } catch ( e ) {
            console.log('error get exchanges from cba', e)
        }
    }
}

module.exports = ExchangeService
