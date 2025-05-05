export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toISOString().split('T')[0];
}

export const filterPatients = (data) => {
  console.log("data", data);
  const results = data?.filter((item) =>
    item?.userRole?.id === 1
  )

  console.log("results", results);
  const tableData = results?.map((item) => {
    return {
      id: item?.id,
      name: `${item?.fName} ${item?.lName}`,
      code: generateRandomId(),
      dob: item?.userDetail?.dob,
      bmi: item?.userDetail?.height / item?.userDetail?.weight,
      email: item?.email,
    }
  })
  return tableData
}

export const formatReadableDateTime =(isoDateTimeStr)=> {
  const dt = new Date(isoDateTimeStr);
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return dt.toLocaleString('en-US', options);
}


const generateRandomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'PT-';
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


export const calculateAge = (dob) => { 
  if (!dob) return 0;
  
  const today = new Date();
  const birthDate = new Date(dob);  
  if (isNaN(birthDate.getTime())) return 0;
  
  if (birthDate > today) return 0;
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}