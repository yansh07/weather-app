import dayjs from 'dayjs'

function Day() {
    const now = dayjs();
  return (
   <div className="px-8 text-gray-300/90 text-md font-heading ">
      <div>{now.format("dddd")}</div>
      <div>{now.format("DD MMM, YYYY  h:mm A")}</div>
    </div>
  )
}

export default Day