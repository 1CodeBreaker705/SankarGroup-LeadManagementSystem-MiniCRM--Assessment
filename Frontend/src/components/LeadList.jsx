import axiosClient from "../axiosConfig"

function LeadList({leads,fetchLeads}){


const updateStatus=async(id,status)=>{

  try{

  await axiosClient.put(`/leads/${id}`,{status})

  await fetchLeads()

  }
  catch(err){

   console.log(err)

  }

}


const deleteLead=async(id)=>{

  try{

  await axiosClient.delete(`/leads/${id}`)

  await fetchLeads()

  }
  catch(err){

   console.log(err)

  }

}


return(

    <div className="mt-6">

    <h2 className="text-xl font-semibold mb-4">Leads</h2>

    {leads.length===0 && (

      <div className="bg-white p-4 rounded shadow text-center">

      No leads found

      </div>

    )}


    <div className="space-y-4">

    {leads.length>0 && leads.map((lead)=>(

      <div key={lead.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

      <h3 className="font-bold text-lg">{lead.name}</h3>

      <p>Phone: {lead.phone}</p>

      <p>Source: {lead.source}</p>

      <p>Status:

        <span
        className={`ml-2 px-2 py-1 rounded text-white

        ${lead.status==="Interested"
        ? "bg-blue-500"
        : lead.status==="Converted"
        ? "bg-green-500"
        : "bg-red-500"

        }`}

        >

        {lead.status}

      </span>

      </p>


      <div className="flex gap-3 mt-3">

        <select value={lead.status} onChange={(e)=>updateStatus(lead.id,e.target.value)}className="border p-2 rounded">

          <option>Interested</option>

          <option>Not Interested</option>

          <option>Converted</option>

        </select>


        <button onClick={()=> deleteLead(lead.id)} className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded">Delete</button>

        </div>

        </div>

      ))}

  </div>

</div>

)

}

export default LeadList