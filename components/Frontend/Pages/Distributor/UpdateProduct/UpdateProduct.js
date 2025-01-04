'use client';

import { FiPlus } from 'react-icons/fi';
import UpdateProductLogic from "./UpdateProductLogic";
import styles from './UpdateProduct.module.css';
import { FaPlus } from 'react-icons/fa';

export default function UpdateProduct() {

  const {pageStates, pageTasks} = UpdateProductLogic();

  return (
    <div className={`w-100 d-flex flex-column`}>

      {/* title section */}
      <div className={`d-flex  mt-2`} >

        {/* title */}
        <div className={` page-title`} >Update Product</div>
        
      </div>

      <div className={`mt-2`} >
        
          <form id={'updateProductForm'} className={`${styles.formStyle} `}>

            <div className={` row gap-3 mt-3`} >

              {/* left section */}
              <div className={`border col pt-4 pb-5 ps-4 pe-4`} >
                <div className={`${styles.inputsWrapper} `} >

                  <div  className={`${styles.subWrapper} pt-0 pb-3 h5 fw-bold`} >Product Section</div>

                  {/* product_name */}
                  <div  className={`${styles.subWrapper} pt-0 pb-3`} >
                      <div className={`row g-0`} >
                          <div className={`${styles.label} w-auto fw-semibold`} >
                              Product Name
                          </div>
                          <div className={`col`} >
                              <input 
                                  name={'product_name'} 
                                  id={'product_name'} 
                                  type={'text'} 
                                  className={`${styles.input} form-control`} 
                                  required
                              >
                              </input>
                              <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                          </div>
                      </div>
                  </div>

                  {/* discription */}
                  <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            Description
                        </div>
                        <div className={`col`} >
                            <input 
                                name={'description'} 
                                id={'description'} 
                                type={'text'} 
                                className={`${styles.input} form-control`} 
                                required
                            >
                            </input>
                            <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                        </div>
                    </div>
                  </div>

                  {/* category */}
                  <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            Category
                        </div>
                        <div className={`col`} >
                            <select 
                              name={'category_id'} 
                              id={'category_id'} 
                              defaultValue={""}
                              className={`${styles.input} form-control`}  
                              onChange={pageTasks.onSelectCategory}
                              required
                            >
                              {
                                  pageStates.FormState.inputs[2].options.map((option, index)=>{
                                      return(
                                          <option key={option.id} value={option.value} >{option.displayValue}</option>   
                                      )
                                  })
                              }
                            </select> 
                            <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                        </div>
                    </div>
                  </div>

                  {/* sub_category_id */}
                  <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            Sub Category
                        </div>
                        <div className={`col`} >
                            <select 
                              name={'sub_category_id'} 
                              id={'sub_category_id'} 
                              defaultValue={""}
                              className={`${styles.input} form-control`}  
                              
                            >
                              {
                                  pageStates.FormState.inputs[3].options.map((option, index)=>{
                                      return(
                                          <option key={option.id} value={option.value} >{option.displayValue}</option>   
                                      )
                                  })
                              }
                            </select> 
                            <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                        </div>
                    </div>
                  </div>

                  {/* brand_id */}
                  <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            Brand
                        </div>
                        <div className={`col`} >
                            <select 
                              name={'brand_id'} 
                              id={'brand_id'} 
                              defaultValue={""}
                              className={`${styles.input} form-control`}  
                              required
                            >
                              {
                                  pageStates.FormState.inputs[4].options.map((option, index)=>{
                                      return(
                                          <option key={option.id} value={option.value} >{option.displayValue}</option>   
                                      )
                                  })
                              }
                            </select> 
                            <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                        </div>
                    </div>
                  </div>

                  {/* hsn_code_id */}
                  <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                    <div className={`row g-0`} >
                        <div className={`${styles.label} w-auto fw-semibold`} >
                            Hsn Code
                        </div>
                        <div className={`col`} >
                            <select 
                              name={'hsn_code_id'} 
                              id={'hsn_code_id'} 
                              defaultValue={""}
                              className={`${styles.input} form-control`}  
                              required
                            >
                              {
                                  pageStates.FormState.inputs[5].options.map((option, index)=>{
                                      return(
                                          <option key={option.id} value={option.value} >{option.displayValue}</option>   
                                      )
                                  })
                              }
                            </select> 
                            <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                        </div>
                    </div>
                  </div>

                  

                </div>
              </div>

              {/* right section */}
              <div className={`border col pt-4 pb-5 ps-4 pe-4`} >
                {
                  pageStates.FormState.variants.map((item, index)=>{
                    return(
                      <div  key={index} className={`${styles.inputsWrapper} pt-3 pb-3 border-bottom `} >

                        <div  className={`${styles.subWrapper} pt-3 pb-3 h5 fw-bold`} >Variant {index+1}</div>

                        {/* image */}
                        <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                          <div className={`row g-0`} >
                              <div className={`${styles.label} w-auto fw-semibold`} >
                                Product Image
                              </div>
                              <div className={`col`} >
                                  <input 
                                    type='file'  
                                    name={item[0].name} 
                                    id={item[0].id}  
                                    className="form-control" 
                                    onChange={pageTasks.onImageSelect}
                                    
                                  />  
                                  <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                              </div>
                          </div>
                        </div>

                        <div className='row' >
                          <div className='col-6' >

                            {/* unit_id */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                      Unit
                                  </div>
                                  <div className={`col`} >
                                      <select 
                                        name={item[1].name} 
                                        id={item[1].id} 
                                        defaultValue={""}
                                        className={`${styles.input} form-control`}  
                                        required
                                      >
                                        {
                                            pageStates.FormState.variants[index][1].options.map((option, index)=>{
                                                return(
                                                    <option key={option.id} value={option.value} >{option.displayValue}</option>   
                                                )
                                            })
                                        }
                                      </select> 
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>

                          </div>
                          <div className='col-6' >

                            {/* variant_unit_quantity */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    Unit Quantity
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[2].name} 
                                          id={item[2].id} 
                                          type="number"
                                          step="1"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>                    
                          
                          </div>
                        </div>

                        <div className='row' >
                          <div className='col-6' >
                            {/* variant_stock_quantity */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    Stock Quantity
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[3].name} 
                                          id={item[3].id} 
                                          type="number"
                                          step="1"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>                    
                          </div>
                          <div className='col-6' >
                            {/* variant_purchase_price */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    Purchase Price
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[4].name} 
                                          id={item[4].id} 
                                          type="decimal"
                                          step="0.01"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='row' >
                          <div className='col-6' >
                            {/* variant_b2b_selling_price */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    B2C Selling Price
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[5].name} 
                                          id={item[5].id} 
                                          type="decimal"
                                          step="0.01"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-6' >
                            {/* variant_b2c_selling_price */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    B2B Selling Price
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[6].name} 
                                          id={item[6].id} 
                                          type="decimal"
                                          step="0.01"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='row' >
                          <div className='col-6' >
                            {/* variant_mrp */}
                            <div  className={`${styles.subWrapper} pt-3 pb-3`} >
                              <div className={`row g-0`} >
                                  <div className={`${styles.label} w-auto fw-semibold`} >
                                    MRP
                                  </div>
                                  <div className={`col`} >
                                      <input 
                                          name={item[7].name} 
                                          id={item[7].id} 
                                          type="decimal"
                                          step="0.01"
                                          min={0}
                                          className={`${styles.input} form-control`} 
                                          required
                                      >
                                      </input>
                                      <div className={` invalid-feedback`} >{'invalid feedback'}</div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })
                }

                {/* submit button */}
                <div className={` d-flex w-100  mt-3`} >
                  <button type="submit" className="c-btn-primary ms-auto me-3 " onClick={pageTasks.onSubmit}  >
                      <div>Update Product</div>
                      {(pageStates.FormState.status == "submitted")&&
                          <span className="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                      }
                  </button>
                </div>

              </div>

            </div>
            
          </form>
        
      </div>


    </div>
  );
}

