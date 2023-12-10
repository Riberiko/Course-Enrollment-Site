import { useState } from "react"

export default ({data}) => {

    const [more, setMore] = useState(false)

    function handleClick()
    {
        setMore(!more)
    }

    return(
        <div className="courseItem" onClick={() => handleClick()}>
            <p>
                Name: {data.description}<br/>
                Type: {data.code_type}<br/>
                Teacher: {data.teacher_name}<br/>
                Start: {data.start_time}<br/>
                End: {data.end_time}<br/>
                Enrolled Count: {data.enrolled_count}<br />
                Capacity : {data.capacity}<br/>
                {
                    more &&
                    <>
                        ASS
                    </>
                }
            </p>
            <input type="button" value='Register' />
        </div>
    )
}