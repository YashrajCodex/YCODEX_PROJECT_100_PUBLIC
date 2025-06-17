import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print'
import { useForm } from 'react-hook-form';
function InstaBio() {
    let inputStyle = 'w-8/12 px-2 py-1 text-xs h-auto';
    const [color, setColor] = useState('bg-white');

    const { register, handleSubmit, formState: { errors } } = useForm();
    const ComponentRef = useRef(null);
    const onSubmit = (data) => {
      console.log(data);
    };

  return (
    <>
      <div className="insta-bio relative my-2 items-center flex flex-col contain max-sm:w-[97vw] w-[63vw] mx-auto text- min-h-[89vh] justify-center">
      <div className='absolute flex flex-col w-[20vw] overflow-hidden h-[4.5vh] top-[-12px] right-17 hover:h-auto'>
        <div>Hover Me</div>
        <div className='hover:h-auto hover:w-auto'>
          <h1 className='w-[100vw] h-18 text-sm text-white bg-black rounded p-3'>Background Color</h1>
          <div className='hover:h-8 w-auto bg-white p-2 cursor-pointer' onClick={()=> setColor('bg-white')}>White</div>
          <div className='hover:h-8 w-auto bg-slate-800 p-2' onClick={()=> setColor('bg-slate-800')}>Dark</div>
          <div className='hover:h-8 w-auto bg-blue-500 p-2' onClick={()=> setColor('bg-blue-700')}>Blue</div>
          <div className='h-8 w-auto bg-green-500 p-2' onClick={()=> setColor('bg-green-700')}>Green</div>
          <div className='h-8 w-auto bg-red-500 p-2' onClick={()=> setColor('bg-red-700')}>Red</div>
          <div className='h-8 w-auto bg-orange-500 p-2' onClick={()=> setColor('bg-orange-700')}>Orange</div>
        </div>
        {/* <div></div>
        <div></div>
        <div></div> */}
      </div>
        <div ref={ComponentRef} className={`w-[50vw] max-sm:w-full print:w-[20cm] print:h-[28.7cm] ${color} print:m-auto print:my-3 my-2 p-6 border-4 border-cyan-500  flex justify-start items-center gap-3 flex-col`}>
          <h1 className='font-bold tracking-widest underline text-2xl'>Biodata</h1>
          <form className='form-bio flex w-full flex-col items-start justify-end gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className= "flex justify-between w-full "><label htmlFor="name" className="label-class-bio border-b-1px">Name: </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
              placeholder="Enter your full name"
            /></div>
            {errors.name && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="dob" className="label-class-bio">Date of Birth: </label>
            <input
              type="date"
              id="dob"
              {...register('dob', { required: true })}
              className={`input-class-bio ${inputStyle}`}
            /></div>
            {errors.dob && <div className=" text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="occupation" className="label-class-bio">Occupation: </label>
            <input
              type="text"
              id="occupation"
              {...register('occupation', { required: true })}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your current occupation"
            /></div>
            {errors.occupation && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="education" className="label-class-bio">Education: </label>
            <input
              type="text"
              id="education"
              {...register('education', { required: true })}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your educational qualifications"
            /></div>
            {errors.education && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="grandFatherName" className="label-class-bio">Grandfather's Name: </label>
            <input
              type="text"
              id="grandFatherName"
              {...register('grandFatherName')}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your grand-father's name (Optional)"
            /></div> 
            {errors.grandFatherName && <div className="text-xs font-semibold text-red-500 underline">{errors.grandFatherName}</div>}

            <div className= "flex justify-between w-full"><label htmlFor="grandMotherName" className="label-class-bio">Grandmother's Name: </label>
            <input type="text"
              id="grandMotherName"
              {...register('grandMotherName')}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your grand-mother's name (Optional)"
            /></div> 
            {errors.grandMotherName && <div className="text-xs font-semibold text-red-500 underline">Nothing happened continue</div>}

            <div className= "flex justify-between w-full"><label htmlFor="fatherName" className="label-class-bio">Father's Name: </label>
            <input
              type="text"
              id="fatherName"
              {...register('fatherName', { required: true })}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your father's name"
            /></div>
            {errors.fatherName && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="motherName" className="label-class-bio">Mother's Name: </label>
            <input
              type="text"
              id="motherName"
              {...register('motherName', { required: true })}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your mother's name"
            /></div>
            {errors.motherName && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="brotherName" className="label-class-bio">Brother's Name: </label>
            <input
              type="text"
              id="brotherName"
              {...register('brotherName')}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your brother's name (Optional)"
            /></div>
            {errors.brotherName && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="sisterName" className="label-class-bio">Sister's Name: </label>
            <input
              type="text"
              id="sisterName"
              {...register('sisterName')}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your sister's name (Optional)"
            /></div> 
            {errors.brotherName && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}

            <div className= "flex justify-between w-full"><label htmlFor="BussinesProfession" className="label-class-bio">Grandmother's Name: </label>
            <input type="text"
              id="BussinesProfession"
              {...register('BussinesProfession')}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Any Bussines Profession (Optional)"
            /></div> 
            {errors.BussinesProfession && <div className="text-xs font-semibold text-red-500 underline">Nothing happened continue</div>}

            <div className= "flex justify-between w-full"><label htmlFor="address" className="label-class-bio">Address: </label>
            <textarea
              id="address"
              {...register('address', { required: true })}
              className={`input-class-bio ${inputStyle}`}
              placeholder="Your complete address"
            /></div>
            {errors.address && <div className="text-xs font-semibold text-red-500 underline">*This field is required</div>}
            {/* <button className='bg-blue-600 text-white py-2 px-4 rounded' type="submit">Console log data</button>  */}
            </form>
            <div className='text-sm border-2 border-red-500 rounded-md p-2 self-start hidden print:inline-block'>
              <h1 className='font-bold tracking-wider'>Yashraj Marriage Bureau</h1>
              <h2>Pandit Sunil Kumar Joshi</h2>
              <p>Phone number: 9438568817, 9338675510</p>
            </div>
        </div>
        <button type="button" onClick={useReactToPrint({content: ()=> ComponentRef.current})} className='border-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white'>Print / Save as PDF</button>
      </div>
    </>
  );
}

export default InstaBio;
