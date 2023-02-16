import { SyncOutlined } from "@ant-design/icons"
//authForm is liye use kia hai k submit pe jo loading ho rahi hai wo hoo
const AuthForm = () => ({
    handleSubmit, name, setName, email, setEmail, password, setPassword,loading,page
}) => (

    <form onSubmit={handleSubmit}>
      {page !== "login" && (
      <div className="form-group p-2">
        <small>
        <label className="text-muted">your name</label>
        </small>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Enter name" />
    </div>
      )}
      {page !== "login" && (
      <>
    <div className="form-group p-2">
        <small>
        <label className="text-muted">your Email</label>
        </small>
        {/* is value k email ki jaga name likh dete to name pe likhtay to saath email pe b likha hwa ata */}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter Email" />
    </div>
      
    <div className="form-group p-2">
        <small>
        <label className="text-muted">your Password</label>
        </small>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Password" />
    </div>
    <div className="form-group p-2">
        <small>
            <label className="text-muted">Pick a question</label>
        </small>
        {/* phr tm name iddogay takay tm questiuon select kr skho */}
        <select className="form-control" >
            {/* select krwao phr option dedo */}
            <option value="1">What is your favourite color?</option>
            <option>What is your best friend name?</option>
            <option>What city your were born?</option>
        </select>
        <small className="form-text text-muted">
          When you forget the Password
        </small>
        <div className="form-group p-2">
            <input type="text"
            className="form-control"
            placeholder="Wrtie your answer here"
            />
        </div>
    

    </div>
    </>
      )}
    <div className="form-group p-2 ">
    <button  className="btn btn-primary btn-clock col-12">{loading ? <SyncOutlined spin className="py-1"/> : "Submit"}</button>
    </div> 
    </form>

)
export default AuthForm;