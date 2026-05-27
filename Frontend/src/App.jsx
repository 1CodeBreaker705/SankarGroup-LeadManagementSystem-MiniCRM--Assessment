import {useEffect,useState} from "react"
import LeadForm from "./components/LeadForm"
import LeadList from "./components/LeadList"
import axiosClient from "./axiosConfig"

function App(){

const [leads,setLeads]=useState([])
const [search,setSearch]=useState("")

 const fetchLeads=async()=>{

      try{
        const res=await axiosClient.get("/leads")
        setLeads(res.data)

      }
      catch(err){

      console.log(err)

      }

}


useEffect(()=>{
 

 fetchLeads()

},[])


const filteredLeads=leads.filter(
  lead => lead.name?.toLowerCase().includes(search.toLowerCase())
)


return(

      <div className="min-h-screen bg-gray-100 p-6">

        <h1 className="text-3xl font-bold text-center mb-8">Lead Management System</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-4 rounded shadow">

            <h3>Total Leads</h3>

            <p className="text-2xl font-bold">

            {leads.length}

            </p>

          </div>


          <div className="bg-white p-4 rounded shadow">

            <h3>Converted</h3>

            <p className="text-2xl font-bold">

            {
            leads.filter(
              lead=>lead.status==="Converted"
            ).length
            }

            </p>

          </div>


          <div className="bg-white p-4 rounded shadow">

            <h3>Interested</h3>

            <p className="text-2xl font-bold">

            {
            leads.filter(
              lead=>lead.status==="Interested"
            ).length
            }

            </p>

          </div>

        </div>

        <LeadForm fetchLeads={fetchLeads}/>
        <input type="text" placeholder="Search by name" value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full p-3 rounded-lg border mb-2 mt-10 outline-none focus:ring-2 focus:ring-blue-400"/>
        <LeadList leads={filteredLeads} fetchLeads={fetchLeads}/>

      </div>

)

}

export default App