

const PopPap = ({
  component:Component, 
  onClose, 
  data, 
  inputs = null,
  request = null,
  setIsloading = null
}) => {
   
  
  return (

    <div className='  w-full h-full bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50 fixed top-0 left-0 '>     
      <div className='bg-white p-5 rounded-[16px] shadow-md relative'>
        <Component 
          data={data} 
          inputs={inputs}
          request={request} 
          setIsloading={setIsloading}
          />
        <button onClick={onClose}
        className='absolute top-2 right-2 cursor-pointer'>❌
      </button>
      </div>
    </div>

  )
}

export default PopPap