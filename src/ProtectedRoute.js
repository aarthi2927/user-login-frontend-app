export default function ProtectedRoute({children}){
    const token =localStorage.getItem('token');
    return(
        token ?
         <div>
{children}
        </div>
        :
        <div>
          <h1>please login ...</h1>  
        </div>
    )
}