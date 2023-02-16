import Link from "next/link";

const Nav = () => {
    return (
        // justify-content-end krne se ye home login and register button sb end pe ajayegay 
        <nav className="nav d-flex justify-content-between"
            style={{ backgroundColor: "grey"}}>
          
            {/* link krwa dia */}
       <Link href="/" className="nav-link text-light">
      Home
      </Link>
      {/* bootstrap */}
   
    
            {/* link krwa dia */}
       <Link href="/Login" className="nav-link text-light">
      Login
      </Link>
      {/* bootstrap */}
    
    
            {/* link krwa dia */}
       <Link href="/Register" className="nav-link text-light">
        Register
        </Link>
      {/* bootstrap */}
      {/* ghalati ye thi k ap jo link lia to login ka Login caps m rakhna hai like that Login */}
    
</nav>

    );

};
export default Nav;