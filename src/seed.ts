//you can send a seed from server and generate content based on the pseudorandom of this seed
export const seedGen = {
    create:(seed) => {
        let value = seed;
      
        return {
            random:()=>{
                value = value * 16807 % 2147483647;
                return value/2147483647;
            }
        }
    }
};