export const Testscroll = (props) => {
  return(
    <div className="row m-0">
        <iframe className="pantalla-grande" src={props.url} frameborder="0"></iframe>
    </div>
  )
}