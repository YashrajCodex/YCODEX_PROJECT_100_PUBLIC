import { useEffect, useState } from "react"

// search?type=movie&genre=Drama&rows=25&sortOrder=ASC&sortField=id
export default function useMovies(search:string) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('unknown error!')

    useEffect(function () { 
        async function fetchMovies() {
            setLoading(true)
            setError('')
            if (!search || search.length < 3) return
            try { 
                const res = await fetch(``)
                if(!res.ok) throw new Error(`no response!`)
                setData(await res.json())
                setError(null)
            }
            catch (err) { 
                setError(err)
                setData(null)
            }
            finally { 
                setLoading(false)
            }
        }
        fetchMovies()
    }, [search])
    return {data, loading, error}
}