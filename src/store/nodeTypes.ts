type isRestrictedNode = {
    allowsMultipleConnection: boolean;
  };
  
  export type TextGetter ={
    text: string
  }

  export type TextSetter = {
    text: string,
    subType : string
  }

  export type ColorGetter ={
    color: string
  }

  export type ColorSetter = {
    color: string
  }

  
  
  export const textGetter: TextGetter & isRestrictedNode = {
      text: "will change",
      allowsMultipleConnection: false
  };
  
 export const colorGetter: ColorGetter & isRestrictedNode = {
      color: "red",
      allowsMultipleConnection: false,
  };
  