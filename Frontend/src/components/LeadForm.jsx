import {useState} from "react"
import axiosClient from "../axiosConfig"


function LeadForm({fetchLeads}){

const [loading,setLoading]=useState(false)
const [formData,setFormData]=useState({

  name:"",
  phone:"",
  source:"Call"

})


const handleChange=(e)=>{

    setFormData({

    ...formData,
    [e.target.name]:e.target.value

    })

}


const handleSubmit=async(e)=>{

    e.preventDefault()

    try{

      if(!formData.name || !formData.phone){

          alert("Fill all fields")

          return
      }

      if(!/^\d{10}$/.test(formData.phone)){

        alert("Phone must contain 10 digits")

        return

      }

      setLoading(true)  

      await axiosClient.post("/leads",formData)

      await fetchLeads()

      setFormData({

      name:"",
      phone:"",
      source:"Call"

      })

    }
    catch(err){

     console.log(err)

    }
    finally{

     setLoading(false)

    }

  }


return(

      <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-semibold mb-4">Add Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

      <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />

      <input type="text" name="phone" placeholder="Enter phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded"/>

      <select name="source" value={formData.source} onChange={handleChange} className="w-full border p-2 rounded">

        <option value="Call">Call</option>

        <option value="WhatsApp">WhatsApp</option>

        <option value="Field">Field</option>

      </select>

      <button disabled={loading} className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded">{loading ? "Adding..." : "Add Lead"}</button>

      </form>

      </div>

 )

}

export default LeadForm