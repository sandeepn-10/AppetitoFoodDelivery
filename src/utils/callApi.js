export async function fetchData(url){
    const rest = await fetch(url)
    const json = await rest.json()
    return json
}