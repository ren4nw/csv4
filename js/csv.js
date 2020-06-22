(function() {

    const csv = document.querySelector('#csv')
    const json = document.querySelector('#json')

    const formatHandlers = {
        json: (e) => {
            const csvValue = csv.value

            if (!csvValue) {
                alert('CSV não pode ser vazio')
                return
            }

            const csvLines = csvValue.split('\n').map(item => {
                item = item.replace(/"|\s{2,}|^\s|\s$/g, '')
                item = item.split(',')

                return item
            })

            const keys = csvLines.splice(0, 1)

            const csvObj = csvLines.map(item => {
                const obj = {}

                for (let i = 0; i < item.length; i++) {
                    obj[keys[0][i]] = item[i]
                }

                return obj
            })
            
            csv.value = ''
            json.value = JSON.stringify(csvObj, null, 2)
        },
        csv: (e) => {
            const jsonValue = json.value

            try {
                const jsonObj = JSON.parse(jsonValue)
                const firstObj = jsonObj[0]
                const header = Object.keys(firstObj)

                const csvData = []
                csvData.push(header.join(','))

                for (let obj of jsonObj) {
                    const value = Object.values(obj).join(',')
                    csvData.push(value)
                }

                json.value = ''
                csv.value = csvData.join('\n')
            } catch (e) {
                alert('Invalid json')
                return
            }
        }
    }

    const convertHandler = (e) => {
        const formatTo = e.target.getAttribute('data-convert-to')

        if (!formatTo) {
            console.log('Invalid format')
            return
        }

        formatHandlers[formatTo](e)
    }

    document.querySelectorAll('.convert').forEach(item => {
        item.addEventListener('click', convertHandler)
    })
})();