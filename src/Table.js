import React from 'react'

const Table = (props) => {
    return (
            <tr>
                <th scope="row">{props.seqno + 1 }</th>
                <td>{props.rollnumber}</td>
                <td>{props.result}</td>
            </tr>
    )
}

export default Table;
