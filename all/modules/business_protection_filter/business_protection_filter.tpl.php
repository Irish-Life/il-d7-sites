<?php $plus_minus = "<span class=\"fa fa-plus pull-right \"></span><span class=\"fa fa-minus pull-right \"></span>"; ?>
<div class="content clearfix">
    <div class="col-lg-12 header-banner">
        <div class="col-lg-6">&nbsp;</div>
        <div class="col-lg-6" style="text-align:center;">
            <a href="javascript:void(0)" class="open bp-btn bp-startBtn" style="">Start<i class="fa fa-chevron-right"></i></a>
        </div>
    </div>
    <div class="col-lg-12 panel" id="splashScreen">
        <div class="col-lg-12">
            <h3>Protecting You and Your Business</h3>
            <p>Use our Business Protection Pathfinder to navigate through your clients business protection needs. Business Protection Pathfinder will take you to the information you need, to help you make a recommendation for your client. Click on the Start button now.</p>
            <ul class="disc">
                <li><i><a href="http://www.bline.ie/protection/business-protection"><i class="fa fa-external-link"></i>Click here to view all documents</a></i></li>
            </ul>
        </div>
    </div>
    <div class="col-lg-12 panel" id="bp-app" style="display:none;">
    	<div class="col-lg-12">
	      	<nav style="display:none;" class="navitems">
			    <ul>
			        <li><a href="javascript:void(0)" class="navlink" data-div="home-screen" href="#home-screen">Home</a></li>
			    </ul>
			</nav>
			<div class="steps">
			   <ul class="steps-container navitems">
			      <li style="width:50%;" class="activated">
			         <div data-div="home-screen" class="step">
			            <div class="step-image"><span></span></div>
			            <div class="step-description">Home</div>
			         </div>
			      </li>
			   </ul>
			   <div class="step-bar" style="width: 25%;"></div>
			</div>
	    </div>
        <div class="screen-part" id="home-screen">
            <div class="col-lg-12">
                <div class="col-lg-6">
                    <h2>Protecting You and Your Business</h2>
                    <p>What type of business client are you?<p>
                </div>
                <div class="col-lg-6">
                    <div class="col-lg-12 ptop10">
                        <a href="javascript:void(0)" class="btn bp-btn" id="bp-partnership">Are you a partner in a partnership ?</a><br>
                    </div>
                    <div class="col-lg-12 ptop10">
                        <a href="javascript:void(0)" class="btn bp-btn" id="bp-shareholder">Are you a shareholder in a company ?</a><br>
                    </div>
                    <div class="col-lg-12 ptop10">
                        <a href="javascript:void(0)" class="btn bp-btn" id="bp-trader">Are you a sole trader ?</a><br>
                    </div>
                </div>
            </div>
        </div>
        <div id="partnership" style="display:none;">
            <div class="screen-part" id="partnership-screen" style="display:none;">
                <div class="col-lg-12">
                	<div class="col-lg-12 ptop10">
                    	<h1>Partnership Insurance</h1>
                        <h3>Provides money on the death of a partner to allow the surviving partners to buy out his / her estate from the partnership. <span class="modalLink"><a data-toggle="modal" data-target="#myPartnershipModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Why do you need partnership insurance?</a></span></h3>
                        <h2 class="ptop10">There are two steps:</h2>
                    </div>
                	<div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                		<h1 style="color:#50C9B5 !important;">Step 1. Life Assurance</h1>
                		<h4>Each partner should take out a protection plan on his/her own life for the benefit of the other partners.</h4>
                        <h4 style="text-align: center;">This can be done in two ways:</h4>
                	</div>
                    <div class="col-lg-6 ptop10">
                        <h2 class="accordion"> <a id="LifeofanotherExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#Lifeofanother" class="collapsed">Option 1) Life of another<?php echo $plus_minus; ?></a></h2>
                        <div class="col-lg-12 collapse ptop10" id="Lifeofanother">
                            <div class="col-lg-12 documents-container">
                                <h2>You will need:</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank"  class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_underwriting_questionnaire') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_legal_agreement') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Legal Agreement</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-12 documents-container">
                                <h2>Additional information</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_insurance_adviser_guide') ?>" target="_blank"  class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Partnership Insurance - an advisers guide</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_life_of_another_arrangement_taxed') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="pad-l-8">Each partner who has signed up to the legal agreement takes out a protection plan on the life of the other partners. </p>
                        <p class="pad-l-8">The cover on each plan should be equal to the value of each partners share of the partnership. </p>
                        <p class="pad-l-8">The owner of each plan pays the premium on the plan. </p>
                    </div>
                    <div class="col-lg-6 ptop10">
                        <h2 class="accordion orange"><a id="OwnlifeintrustExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#Ownlifeintrust" class="collapsed">Option 2) Own life in trust<?php echo $plus_minus; ?></a></h2>
                        <div class="col-lg-12 collapse ptop10" id="Ownlifeintrust">
                            <div class="col-lg-12 documents-container">
                                <h2>You will need:</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_own_life_in_trust_form') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Trust Form</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_legal_agreement') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Legal Agreement</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-12 documents-container">
                                <h2>Additional information</h2>
                                <div class="col-lg-12 ">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_insurance_adviser_guide') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Partnership Insurance - an advisers guide</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_own_life_in_trust_arrangement_taxed') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_partnership_how_to_complete_the_trust_form') ?>" target="_blank" class="pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How To Complete The Trust Form</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="pad-l-8">Each partner who has signed up to the legal agreement takes out a protection plan on their own life for a sum assured equal to the value of their share of the partnership. </p>
                        <p class="pad-l-8">Each plan is written under trust for the benefit of the other partners covered by the agreement. </p>
                        <p class="pad-l-8">Each partner pays the premium on his / her own plan. </p>
                    </div>

                    <div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                    	<h1 style="color:#50C9B5 !important;">Step 2. Partnership Legal Agreement</h1>
                    	<p>Should outline the precise entitlement of each partner’s estate in the event of a partner’s death. All participating partners enter into this agreement.</p>
                        <a class="download-link pdf" href="<?php echo variable_get('business_protection_filter_partnership_legal_agreement') ?>" target="_blank" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Partnership Legal Agreement</a>
                    </div>

                </div>
            </div>
        </div>
        <div id="shareholder" style="display:none;">
        	<div class="screen-part" id="shareholder-home" style="display:none;">
	            <div class="col-lg-12">
	                <div class="col-lg-12">
	                    <h2>Shareholder in a Company</h2>
	                </div>
	                <div class="col-lg-12 ptop10 boder">
                        <div class="col-lg-8">
                            <p>Does your company have unsecured loans that need to be repaid on your /someone else’s death? (<a class="pointer" data-toggle="modal" data-target="#myUnsecuredLoanModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Example</a>)</p>
                        </div>
                        <div class="col-lg-4">
                            <a style="width:100%;" href="javascript:void(0)" class="btn bp-btn" id="shareholder-unsecured-loans">Next</a>
                        </div>
                    </div>
                    <div class="col-lg-12 ptop10 boder">
                        <div class="col-lg-8">
                            <p>Is there a key employee whose death or serious illness would impact the profits of the business or who would need to be replaced urgently? (<a class="pointer" data-toggle="modal" data-target="#myLossofProfitsModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Example</a>)</p>
                        </div>
                        <div class="col-lg-4">
                            <a style="width:100%;" href="javascript:void(0)" class="btn bp-btn" id="shareholder-loss-of-profits">Next</a>
                        </div>
                    </div>
                    <div class="col-lg-12 ptop10 boder">
                        <div class="col-lg-8">
                            <p>Do you want to ensure the continuity of the business by putting funds in place to buy back a deceased shareholders share in the company from his / her family? (<a class="pointer" data-toggle="modal" data-target="#myShareholdersharesModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Example</a>)</p>
                        </div>
                        <div class="col-lg-4">
                            <a style="width:100%;" href="javascript:void(0)" class="btn bp-btn" id="shareholder-shareholders-shares">Next</a>
                        </div>
                    </div>
	            </div>
	        </div>
	        <div class="screen-part" id="shareholder-unsecured-loans-screen" style="display:none;">
                <div class="col-lg-12">
                	<div class="col-lg-12">
                		<h1>Keyperson Cover - Loan</h1>
                		<p>The company takes out a protection plan on a key person to provide for the calling in of loans on his / her death or serious illness.</p>
                		<ul class="bpf-list">
                        	<li>Life assured = key person</li>
                        	<li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
                        	<li>Payer of premium = company</li>
                        	<li>Benefits paid to the company</li>
                        </ul>
                	</div>
                    <div class="col-lg-12">
                        <h2>You will need:</h2>
                        <div class="col-lg-12">
                            <ul class="disc">
                                <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_key_person_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                <li><a class="pointer" data-toggle="modal" data-target="#myBoardResolutionModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Board resolution to be completed by the company</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <h2>Additional information</h2>
                        <div class="col-lg-12">
                            <ul class="disc">
                                <li><a href="<?php echo variable_get('business_protection_filter_key_person_adviser_guide') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Keyperson cover – an advisers guide</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_key_person_you_and_your_business_brochure') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;You and your business brochure</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_key_person_loan_cover_arrangement_taxed') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="screen-part" id="shareholder-loss-of-profits-screen" style="display:none;">
                <div class="col-lg-12">
                	<div class="col-lg-12">
                		<h1>Keyperson Cover - Loss of Profits / Replacement Costs</h1>
                		<p>The company takes out a protection plan on a key person to provide for the loss of profits on his / her death or serious illness.</p>
                		  <ul class="bpf-list">
                        	<li>Life assured = key person</li>
                        	<li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
                        	<li>Payer of premium = company</li>
                        	<li>Benefits paid to the company</li>
                      </ul>
                      <p>Typical cover will be between 5 and 10 times salary, or a maximum of 2 times gross profit or 5 times net profit.</p>
                	</div>
                  <div class="col-lg-12">
                        <h2>You will need:</h2>
                        <div class="col-lg-12">
                            <ul class="disc">
                                <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_key_person_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                <li><a class="pointer" data-toggle="modal" data-target="#myBoardResolutionModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Board resolution to be completed by the company</a></li>
                            </ul>
                        </div>
                  </div>
                  <div class="col-lg-12">
                      <h2>Additional information</h2>
                      <div class="col-lg-12">
                          <ul class="disc">
                              <li><a href="<?php echo variable_get('business_protection_filter_key_person_adviser_guide') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Keyperson cover – an advisers guide</a></li>
                              <li><a href="<?php echo variable_get('business_protection_filter_key_person_you_and_your_business_brochure') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;You and your business brochure</a></li>
                              <li><a href="<?php echo variable_get('business_protection_filter_key_person_loss_of_profits_arrangement_taxed') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                          </ul>
                      </div>
                  </div>
                </div>
            </div>
            <div class="screen-part" id="shareholder-shareholders-shares-screen" style="display:none;">
                <div class="col-lg-12">
                	<div class="col-lg-12">
                        <h1>Shareholder Protection</h1>
                        <h4>Provides funds on the death of a shareholder to enable the surviving shareholders to maintain ownership and control of the business. It also allows for the deceased's shares to be bought back from his / her estate.</h4>
                        <h2 style="text-align: center;">It can be arranged in two ways:</h2>
                    </div>
                    <div class="col-lg-12">                    	
                    	<div class="col-lg-6">
                    		<h2 style="color: #5261ac !important;">Option 1. Corporate Shareholder Protection</h2>
                            <h4>Corporate Shareholder Protection may be the solution where;</h4>
                    		<ul class="bpf-list">
                    			<li>All shareholders are not participating</li>
                    			<li>The shares have been owned for MORE than 3 years</li>
                    			<li>The plan is owned and the premium paid by the COMPANY.</li><br>
                    		</ul>
                            <h4>It may not be the solution for holding / investment companies, where there are non resident shareholders or the shares have been owned for LESS than 3 years.</h4>
                            <p><i>See the rules for CGT treatment on the sale of shares back to the company.</i></p>
                    		<a style="width: 90%;" href="javascript:void(0)" class="btn bp-btn" id="shareholder-corporate-shareholder-protection-validation">Next</a><br>
                    	</div>
                        <div class="col-lg-6">
                            <h2 style="color: #FCB364 !important;">Option 2. Personal Shareholder Protection</h2>
                            <h4>Personal Shareholder Protection may be the solution in most cases, particularly where;</h4>
                            <ul class="bpf-list">
                                <li>the business is a holding company/investment company</li>
                                <li>shares have been owned for LESS than 3 years</li>
                                <li>there are non resident shareholders, and</li>
                                <li>the plan is to be owned and the premiums paid PERSONALLY.</li>
                            </ul>
                            <h4>It may not be the solution where all shareholders are not participating as only shareholders who participate in the arrangement may benefit from it.</h4><br>
                            <a style="width: 90%;margin-top: 30px;" href="javascript:void(0)" class="btn bp-btn" id="shareholder-personal-shareholder-protection">Next</a><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="screen-part" id="shareholder-personal-shareholder-protection-screen" style="display:none;">
                <div class="col-lg-12">
                	<div class="col-lg-12">
                		<h1>Personal Shareholder Protection</h1>                       

                        <!--<a class="pointer" data-toggle="modal" data-target="#myPersonalShareholderBuyBackModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;What happens after the buy back?</a><br>-->

                        <a href="<?php echo variable_get('business_protection_filter_personal_shareholder_buy_back') ?>" target="_blank" class="download-link"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;What happens after the buy back?</a>

                        <h2 class="ptop10">There are two steps:</h2>
                	</div>
                	<div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                		<h1 style="color:#50C9B5 !important;">Step 1. Life Assurance</h1>
                		<h4>Each shareholder takes out a life assurance plan on his / her own life for the benefit of the other shareholders.</h4>
                        <h4 style="text-align: center;">This can be done in two ways:</h4>
                	</div>

                    <div class="col-lg-6 ptop10">
                        <h2 class="accordion"> <a id="PersonalLifeofanotherExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#PersonalLifeofanother" class="collapsed">Option 1) Life of another<?php echo $plus_minus;?></a></h2>
                        <div class="col-lg-12 collapse ptop10" id="PersonalLifeofanother">
                            <div class="col-lg-12 documents-container">
                                <h2>You will need:</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_personal_shareholder_legal_agreement') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Legal Agreement</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>

                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-12 documents-container">
                                <h2 >Additional information</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_adviser_guide') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Shareholder Protection – an advisers guide</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_you_and_your_business_brochure') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;You and your business brochure</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_personal_shareholder_life_of_another_arrangement_taxed') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="pad-l-8">Each shareholder who has signed up to the legal agreement takes out a protection plan on the life of the other shareholders. </p>
                        <p class="pad-l-8">The cover on the plan should be equal to the value of the life assured’s share of the business. </p>
                        <p class="pad-l-8">The owner of each plan will pay the premium on the plan. </p>
                    </div>

                    <div class="col-lg-6 ptop10">
                        <h2 class="accordion orange"> <a id="PersonalOwnlifeintrustExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#PersonalOwnlifeintrust" class="collapsed">Option 2) Own Life in Trust<?php echo $plus_minus; ?></a></h2>
                        <div class="col-lg-12 collapse ptop10" id="PersonalOwnlifeintrust">
                            <div class="col-lg-12 documents-container">
                                <h2>You will need:</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_trust_form') ?>" target="_blank"  class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Trust Form</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_personal_shareholder_legal_agreement') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Legal Agreement</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>

                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-12 documents-container">
                                <h2>Additional information</h2>
                                <div class="col-lg-12">
                                    <ul class="disc">
                                        <li><a href="<?php echo variable_get('business_protection_filter_shareholder_adviser_guide') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Shareholder Protection – an advisers guide</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_personal_shareholder_own_life_in_trust_arrangement_taxed') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a></li>
                                        <li><a href="<?php echo variable_get('business_protection_filter_how_to_complete_the_trust_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How To Complete The Trust Form</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p class="pad-l-8">Each shareholder covered by the legal agreement takes out a protection plan on their own life for a sum assured equal to the value of their share of the business. </p>
                        <p class="pad-l-8">Each plan is written under trust for the benefit of the other shareholders covered by the agreement. </p>
                        <p class="pad-l-8">Each shareholder pays the premium on his / her own plan. </p>
                    </div>

                    <div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                    	<h1 style="color:#50C9B5 !important;">Step 2. Shareholders Legal Agreement</h1>
                    	<p>The legal agreement provides that in the event of the death of a shareholder</p>
                		<p>the surviving shareholders can exercise an option to compel the deceased's personal representatives to sell the shares to them at market value, or</p>
                		<p>the deceased's personal representatives can exercise an option to compel the surviving shareholders to buy the shares back at market value</p>
                		<p>All participating shareholders who want to increase their share enter into this agreement</p>
                        <a class="download-link pdf" href="<?php echo variable_get('business_protection_filter_personal_shareholder_legal_agreement') ?>" target="_blank"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Shareholders Legal Agreement</a>
                    </div>
                </div>
            </div>
            <div class="screen-part" id="shareholder-corporate-shareholder-protection-validation-screen" style="display:none;">
	            <div class="col-lg-12">
	                <div class="col-lg-12">
	                    <h2>Corporate Shareholder Protection Declaration</h2>
	                    <h4>Before choosing this option you MUST ensure</h4>
	                </div>
	                <div class="col-lg-12 ptop10">
	                    <p>The company can meet the Company Law Conditions i.e. that the company can buy back it’s own shares under it’s constitution. <br><a class="pointer" data-toggle="modal" data-target="#myCorporateQuestion1Modal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Click here to read more...</a></p>
	                </div>
	                <div class="col-lg-12">
	                    <p>The family will meet ALL the conditions to ensure the buy back will be subject to CGT and NOT income tax. <br><a class="pointer" data-toggle="modal" data-target="#myCorporateQuestion2Modal"> <i class="fa fa-external-link"></i>&nbsp;&nbsp;Click here to read more...</a></p>
	                </div>
	                <div class="col-lg-12 ptop10">
	                    <div class="checkbox">
						  	<label><input id="corporate-validation" name="corporate-validation" type="checkbox" value="">I have read and understood the conditions!</label>
						</div>
	                    <button id="shareholder-corporate-shareholder-protection" type="button" class="btn btn-info btn-lg" style="text-shadow:none"  disabled="disabled">Next</button>
	                </div>
	            </div>
	        </div>
	        <div class="screen-part" id="shareholder-corporate-shareholder-protection-screen" style="display:none;">
	            <div class="col-lg-12">
                	<div class="col-lg-12">
                		<h1>Corporate Shareholder Protection</h1>
                		<p>The company takes out a protection plan on each shareholder covered by the legal agreement.</p>
                		<ul class="bpf-list">
                        	<li>Life assured = shareholder</li>
                        	<li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
                        	<li>Payer of premium = company</li>
                        	<li>Benefits are paid to the company</li>
                        </ul>
                        <a href="<?php echo variable_get('business_protection_filter_corporate_shareholder_buy_back') ?>" target="_blank" class="download-link"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;What happens after the buy back?</a>
                        
                        <!-- <a class="pointer" data-toggle="modal" data-target="#myCorporateShareholderBuyBackModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;What happens after the buy back?</a><br> -->
                        <h2 class="ptop10">There are two steps:</h2>
                	</div>
                    <div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                        <h1 style="color:#50C9B5 !important;">Step 1. Life Assurance</h1>
                        <h2>You will need:</h2>
                        <div class="col-lg-12">
                            <ul class="disc">
                                <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_corporate_shareholder_legal_agreement') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Legal Agreement</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_shareholder_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                <li><a class="pointer" data-toggle="modal" data-target="#mySpecialResolutionModal"><i class="fa fa-external-link"></i>&nbsp;&nbsp;Special resolution to be completed by the company</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <h2>Additional information</h2>
                        <div class="col-lg-12">
                            <ul class="disc">
                                <li><a href="<?php echo variable_get('business_protection_filter_shareholder_adviser_guide') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Shareholder Protection – an advisers guide</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_shareholder_you_and_your_business_brochure') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;You and your business brochure</a></li>
                                <li><a href="<?php echo variable_get('business_protection_filter_corporate_shareholder_arrangement_taxed') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;How is the arrangement taxed?</a>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12 ptop30" style="border-top: 1px solid;">
                    	<h1 style="color:#50C9B5  !important;">Step 2. Shareholders Legal Agreement</h1>
                    	<p>The company prepares a legal agreement on each shareholder whose shares are to be bought back on death.</p>
                		<p>The company can exercise a Call option to compel the deceased’s personal representatives to sell the shares back to it at market value, or</p>
                		<p>The deceased’s personal representatives can exercise a Put option to compel the company to buy the shares back from them at market value.</p>
                		<p>All participating shareholders enter into this agreement with the company.</p>
                        <a href="<?php echo variable_get('business_protection_filter_corporate_shareholder_legal_agreement') ?>" target="_blank" class="pdf download-link"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Shareholders Legal Agreement</a>
                    </div>
                </div>
	        </div>
        </div>
        <div id="sole-trader" style="display:none;">
        	<div class="screen-part" id="sole-trader-screen" style="display:none;">
                <div class="col-lg-12">

                	<div class="col-lg-12">
                    	<h1>Sole Trader</h1>
                        <h4>If a sole trader wants to protect his / her business or a key employee in his  / her business this is done on a personal basis.</h4>
                        <h4 style="text-align: center;">This can be done in two ways:</h4>
                    </div>

                    <div class="col-lg-6 ptop10">
                        <h2 class="accordion"> <a id="SoleTraderPersonalCoverExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#SoleTraderPersonalCover" class="collapsed">Option 1) Own Life Plan<?php echo $plus_minus?></a></h2>

                        <div class="col-lg-12 collapse" id="SoleTraderPersonalCover">
                            <p>The sole trader takes out a life assurance plan on his own life to provide for the loss of profits / calling in or loans on his / her death or serious illness</p>
                            <ul class="bpf-list">
                                <li>Life Assured = sole trader</li>
                                <li>Plan owner = sole trader personally</li>
                                <li>Payer of premium = sole trader personally</li>
                                <li>Benefits paid to the estate of the sole trader</li>
                            </ul>
                            <h1>You will need:</h1>
                            <div class="col-lg-12">
                                <ul class="disc">
                                    <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                                    <li><a href="<?php echo variable_get('business_protection_filter_sole_trader_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                                </ul>
                            </div>
                        </div>
                        <p class="pad-l-8">Do you have unsecured loans on your business that need to be repaid on your death?</p>
                    </div>
                    <div class="col-lg-6 ptop10">
                      <h2 class="accordion orange"> <a id="SoleTraderkeyPersonExpand" href="javascript:void(0)" data-toggle="collapse" data-target="#SoleTraderkeyPerson" class="collapsed">Option 2) Life of Another<?php echo $plus_minus;?> </a></h2>
                      <div class="col-lg-12 collapse" id="SoleTraderkeyPerson">
                        <p>The sole trader takes out a life assurance plan on the key employee to provide for the loss of profits on his / her death or serious illness</p>
                        <ul class="bpf-list">
                          <li>Life Assured = key person</li>
                          <li>Plan owner = sole trader personally</li>
                          <li>Payer of premium = sole trader personally</li>
                          <li>Benefits paid to the sole trader personally</li>
                        </ul>
                        <h2>You will need:</h2>
                        <div class="col-lg-12">
                          <ul class="disc">
                            <li><a href="<?php echo variable_get('business_protection_filter_protection_application_form') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Protection Application Form - CAB and Data Capture</a></li>
                            <li><a href="<?php echo variable_get('business_protection_filter_sole_trader_underwriting_questionnaire') ?>" target="_blank" class="pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;&nbsp;Underwriting Questionnaire</a></li>
                          </ul>
                        </div>
                      </div>
                      <p class="pad-l-8">Is there a key employee whose death or serious illness would impact the profits of your business or who would need to be replaced urgently?</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="field field-name-field-basic-web-page-warning field-type-text field-label-hidden">
    <div class="field-items">
        <div class="field-item even">Warning: The information provided is based on our understanding of current legislation and Revenue practice.</div>
        <div class="field-item odd">Warning: In all cases we would recommend that business owners obtain professional legal and tax advice to ensure that any arrangement put in place is appropriate to their personal and corporate circumstances.</div>
    </div>
</div>



<!-- modals -->
<!-- Modal -->
<div id="myPartnershipModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h3>What would happen to your share of the partnership if you were to die?</h3><br>
                <h3>What would happen to your partners share if he/she were to die?</h3><br>
                <h3>What would you like to happen?</h3><br>
                <h3>Would you like to secure a lump sum for your family? </h3><br>
                <h3>Would you like to be able to buy out your partners family?</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myUnsecuredLoanModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
            	<h1>Example - Loan</h1><br>
                <h3>All Print Ltd, a printing company expanded its operation recently with the purchase of two new top of the range machines and the installation of a computerised stock management system.</h3><br>
                <h3>At the time, All Print Ltd did not have the sufficient funds to buy the machinery outright. The bank approved a loan for the company to cover the costs. The managing director Adam signed as the guarantor for the loan.</h3><br>
                <h3>If Adam dies, the bank may call in the loan. The company should take out a protection plan on Adam to make sure that the company has the funds to pay back the loan to the bank.</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myLossofProfitsModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
            	<h1>Example – Loss of Profits / Replacement Costs</h1><br>
                <h3>Z Designs Ltd is a graphic design and advertising company. Peter is the Sales Director and contributes to 90% of the sales margin as he leads the negotiation of any new contracts. Philip is the Head of Design and with 25 years in the business his experience and knowledge is essential.</h3><br>
                <h3>- If Peter were to die the sales margin would immediately be impacted.<br>- If Philip were to die the company would need to recruit a replacement with a similar level of knowledge and experience in this area.</h3><br>
                <h3>The company should look to take out plans on both Peter (loss of profits) and Philip (replacement costs).</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myShareholdersharesModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
            	<h1>Example – Shareholder Protection</h1><br>
                <h3>The Three Amigos Ltd is an IT Consultancy business owned by 3 friends. Alan owns 40%, James owns 40% and Leanne owns 20% of the company.</h3><br>
                <h3>Each of the shareholders are married with families.</h3><br>
                <h3>A colleague of Alans, who worked in a different business, died of a heart attack suddenly and his family who inherited his share sold it to a competitor. This meant a new unknown shareholder came in to the business.</h3><br>
                <h3>As a result the shareholders are concerned about the financial implications of the sudden death of one of them.</h3><br>
                <h3>The shareholders should take out cover as part of a shareholder protection arrangement to;<br>- 1. ensure the continuity of the business and<br>- 2. ensure their families are financially compensated.</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myBoardResolutionModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h1>We recommend the company pass a Board Resolution recording their intention to take out Keyperson Insurance.  The resolution should cover the purpose for which the plan is being taken out.</h1><br>
                <h3><b>Sample</b></h3><br>
                <h3>"That the company shall effect a life assurance plan on the life of Mr X in the sum of €XXX,XXX. The purpose of this insurance is to (meeting the financial loss which the company is likely to suffer) / (protect company borrowing which may be repayable) in the event of his death whilst in the service of the Company</h3><br>
                <h3>Mr Y is hereby authorised to complete all necessary documentation on behalf of the company and it is hereby declared that the proceeds of this insurance are intended for the protection of the Company itself and are not for the benefit of Mr X or his family.“</h3><br>
            </div>
        </div>
    </div>
</div>


<div id="myBuyBackModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h1>We recommend the company pass a Board Resolution recording their intention to take out Keyperson Insurance.  The resolution should cover the purpose for which the plan is being taken out.</h1><br>
                <h3>The Three Amigos Ltd is an IT Consultancy business owned by 3 friends. Alan owns 40%, James owns 40% and Leanne owns 20% of the company.</h3><br>
                <h3>Each of the shareholders are married with families.</h3><br>
                <h3>A colleague of Alans, who worked in a different business, died of a heart attack suddenly and his family who inherited his share sold it to a competitor. This meant a new unknown shareholder came in to the business</h3><br>
                <h3>As a result the shareholders are concerned about the financial implications of the sudden death of one of them</h3><br>
                <h3>The shareholders should take out cover as part of a shareholder protection arrangement to; <br>- 1. ensure the continuity of the business and <br>- 2. ensure their families are financially compensated</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myCorporateQuestion1Modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">

            	<h1>Companies Act 2014</h1>
                <h3>In order for a company to buy back its own shares in a tax efficient manner it must meet the following conditions as set out in the Companies Act 2014:</h3><br>

                <ul class="bpf-list">
                  <li>The buy back must be allowed by either
                    <ul class="bpf-list">
                      <li>The company’s constitution</li>
                      <li>The rights attaching to those shares, or</li>
                      <li>A special resolution of the company</li>
                    </ul>
                  </li>

                  <li>A company cannot buy back all its own shares</li>
                  <li>The company can only buy the shares back ‘out of profits available for distribution’</li>
                  <li>The legal agreement must be authorised by a special resolution.</li>
                  <li>Where the buy back of shares is to be authorised by a special resolution;
                    <ul class="bpf-list">
                      <li>The legal agreement must be made available to the members or at the company office in advance of the meeting</li>
                      <li>Will be ineffective if a shareholder holding shares affected by the resolution exercises his / her voting rights in respect of the shares in favour of the resolution and it would not have been carried without his / her vote; and</li>
                      <li>The terms of the agreement can only be amended or changed by a further special resolution</li>
                    </ul>
                  </li>
                </ul>

            </div>
        </div>
    </div>
</div>

<div id="myCorporateQuestion2Modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
            	<h1>Requirements for CGT treatment</h1>
                <ul class="bpf-list">
                  <li>Must be an unquoted trading company</li>
                  <li>Must be resident and ordinarily resident in the State</li>
                  <li>Must have owned the shares for 3 years at death</li>
                  <li>Seller must reduce their shareholding by at least 25%</li>
                  <li>Seller must not hold more than 30% of the company after the buy back</li>
                  <li>Must not be part of any scheme to avoid paying dividends</li>
                  <li>Must be for the benefit of the trade</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div id="mySpecialResolutionModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h1>Info - Special Resolution</h1><br>
                <h3>The authorisation for the company to enter each Agreement may need to be approved by a special resolution of the company.</h3><br>
                <h3>The Companies Act 2014 contains specific requirements on the passing of a resolution in relation to the acquisition by a company of its own shares. It should be consulted before the acquisition proceeds.</h3><br>
                <h3>The special resolution will be ineffective if a member holding shares affected by the resolution exercises his / her voting rights in respect of the shares in favour of the resolution and it would not have been carried without his / her vote</h3><br>
                <h3>- Therefore to pass such a resolution, that shareholder would need to absent themselves from that meeting, and allow the other shareholders to vote through the special resolution with regard to his/her shareholding</h3><br>
            </div>
        </div>
    </div>
</div>

<div id="myPersonalShareholderBuyBackModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h1>Position of the Surviving Shareholders following the buy back</h1><br>
                <h3><b>Example<br>PERSONAL SHAREHOLDER PROTECTION – OWN LIFE IN TRUST METHOD</b></h3><br>

                <h3>The company The Three Amigos Ltd is valued at €1,000,000 with 3 shareholders as follows</h3>
                <h3>- Alan        40%     €400,000 Life Cover</h3>
                <h3>- James       40%     €400,000 Life Cover</h3>
                <h3>- Leanne      20%     €200,000 Life Cover</h3><br>

                <h3>3 own life in trust plans are effected. The premiums are paid by each shareholder personally.</h3><br>

                <h3><b>Alan Dies</b><br>The sum assured on Alans plan of €400,000</h3>
                <h3>- pays €266,667 to James who buys shares from Alans estate AND</h3>
                <h3>- pays €133,333 to Leanne who buys shares from Alans estate</h3><br>

                <h3>In line with the Legal Agreement.</h3><br>
                <h3>The total number of shares held by the survivor, (the total value of his / her shareholding), will increase.</h3><br>
                <h3>On a subsequent sale of shares by the survivor it is this increased value which will apply for the purposes of Capital Gains Tax on such a disposal. Any chargeable gain arising will of course be reduced by the consideration paid for the shares at the time of death.</h3><br>

            </div>
        </div>
    </div>
</div>


<div id="myCorporateShareholderBuyBackModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body">
                <h1>Position of the Surviving Shareholders following the buy back</h1><br>
                <h3><b>Example<br>PERSONAL SHAREHOLDER PROTECTION – OWN LIFE IN TRUST METHOD</b></h3><br>

                <h3>The company The Three Amigos Ltd is valued at €1,000,000 with 3 shareholders as follows</h3>
                <h3>- Alan        40%     €400,000 Life Cover</h3>
                <h3>- James       40%     €400,000 Life Cover</h3>
                <h3>- Leanne      20%     €200,000 Life Cover</h3><br>

                <h3>3 own life in trust plans are effected. The premiums are paid by each shareholder personally.</h3><br>

                <h3><b>Alan Dies</b><br>The sum assured on Alans plan of €400,000</h3>
                <h3>- pays €266,667 to James who buys shares from Alans estate AND</h3>
                <h3>- pays €133,333 to Leanne who buys shares from Alans estate</h3><br>

                <h3>In line with the Legal Agreement.</h3><br>
                <h3>The total number of shares held by the survivor, (the total value of his / her shareholding), will increase.</h3><br>
                <h3>On a subsequent sale of shares by the survivor it is this increased value which will apply for the purposes of Capital Gains Tax on such a disposal. Any chargeable gain arising will of course be reduced by the consideration paid for the shares at the time of death.</h3><br>

            </div>
        </div>
    </div>
</div>
