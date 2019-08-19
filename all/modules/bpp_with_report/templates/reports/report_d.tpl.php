<?php

  // the variables are posted to the PDF page
  // They are not sent over URL (GET)
  $clientName =  $_POST['clientName'];
  $clientAddress =  $_POST['clientAddress'];
  $businessName =  $_POST['businessName'];
  $businessAddress =  $_POST['businessAddress'];
  $brokerName =  $_POST['brokerName'];

  $brokerNeedsObj =  nl2br($_POST['brokerNeedsObj'])  ; //free text box for broker
  $partnerNeedsLevelofCover =  nl2br($_POST['partnerNeedsLevelofCover'])  ; //free text box for broker

  $keyPersonAName =  $_POST['keyPersonAName'];
  $keyPersonAShare =  $_POST['keyPersonAShare'];
  $keyPersonAValue =  $_POST['keyPersonAValue'];
  $keyPersonBName =  $_POST['keyPersonBName'];
  $keyPersonBShare =  $_POST['keyPersonBShare'];
  $keyPersonBValue =  $_POST['keyPersonBValue'];
  $keyPersonCName =  $_POST['keyPersonCName'];
  $keyPersonCShare =  $_POST['keyPersonCShare'];
  $keyPersonCValue =  $_POST['keyPersonCValue'];
  $keyPersonDName =  $_POST['keyPersonDName'];
  $keyPersonDShare =  $_POST['keyPersonDShare'];
  $keyPersonDValue =  $_POST['keyPersonDValue'];
  $keyPersonEName =  $_POST['keyPersonEName'];
  $keyPersonEShare =  $_POST['keyPersonEShare'];
  $keyPersonEValue =  $_POST['keyPersonEValue'];

  $BrokerProductDetails =  nl2br($_POST['BrokerProductDetails']); //free text box for broker

  // get the node number of the current page
  $time = date("dmy_his", time());
  $today = date("j F Y"); 





  ///////////////////////
  // COVER
  ?>
  <div class="front-img" style="background:url('<?php echo drupal_get_path('module', 'bpp_with_report');?>/images/keyperson-report-cover.jpg') no-repeat;"><div class="front-author">Prepared for <?php echo $businessName ?></div></div>
  <pagebreak>
  <?php
  ///////////////////////
  ///////////////////////
  ///////////////////////
  ///////////////////////
  // Front Letter

  // address & date
  ?>
  <div class="letter-address">
  <?php
    echo $clientName.' <br/>';
    echo $clientAddress[0]['line1'].' <br/>';
    echo $clientAddress[0]['line2'].' <br/>';
    echo $clientAddress[0]['line3'].' <br/>';
    echo $clientAddress[0]['line4'].' <br/>';
    echo "<br/>";
    echo $today.' <br/>';
  ?>
  </div>
  <div class="letter-salutation">
  Dear <?php echo $clientName ?>,
  </div>
  <div class="letter-body">
    <p>Thank you for taking the time to meet me and discuss the financial planning requirements for your business. I am now confirming the outcome of our meeting.</p>
    <p>Please find enclosed your Keyperson Insurance report.</p>
    <p>This report is based on the details gathered at our meeting and provides you with details of the option that  might suit your particular business requirements.</p>
    <p>I will be in contact with you shortly to discuss implementing the option that you have chosen.</p>
    <p>In the meantime, if you have any questions, please do not hesitate to contact me.</p>
  </div>
  <div class="letter-signoff">
    Yours sincerely,<br/>
    <?php echo $brokerName ?>
  </div>
    <pagebreak>

  <div class="report">
           <?php
    if(strlen($BrokerProductDetails) >=1){
      ?>
    <p>Following an analysis of the businesses financial circumstances and based on the information you have provided, our understanding of the businesses requirements are as follows:</p>
    <h3>Needs and Objectives</h3>
    <p> <?php echo $brokerNeedsObj ?></p>
    <?php
    }
    ?>

    
    <p>Keyperson Insurance is life cover and or serious illness cover taken out by a company on the life of a key employee, shareholder or director. The objective is to protect the company against the financial consequences of that individual's sudden death or serious illness.</p>
    <p>It is designed to protect the value of the company's human assets much in the same way as fire insurance protects a company's physical assets.</p>
    <p>Keyperson Insurance protects the future security of the business.</p>

    <h3>Loss of Profits </h3>
    <p>The purpose of this report is to detail the type of arrangement required to protect <?php echo $businessName?> against the estimated financial loss that the business would suffer as a consequence of the death <?php echo (($keyPersonAValue > 0) ? ' or serious illness' : '') ?> of <?php echo $keyPersonAName ?></p>
    <p>This report is based on the answers provided and the selected route chosen through the Business Protection Pathfinder. It is understood that cover is required by the company for loss of profits.</p>

    <h3>Business Details</h3>

    <table>
      <tr>
        <th>Keyperson</th><th>Life Cover</th><th>Serious Illness Cover</th>
      </tr>
      <tr>
        <td><?php echo $keyPersonAName ?></td><td>&euro;<?php echo number_format($keyPersonAShare) ?></td><td>&euro;<?php echo number_format($keyPersonAValue) ?></td>
      </tr>
    </table>

    <h3>Structuring the Arrangement</h3>
    <p>The company takes out a protection plan on <?php echo $keyPersonAName ?> to provide for the loss of profits on their death <?php echo ($keyPersonAValue > 0 ? ' or serious illness' : '') ?>. The plan is arranged as follows:</p>
    <ul>
      <li>Life assured = <?php echo $keyPersonAName ?></li>
      <li>Plan owner = <?php echo $businessName?></li>
      <li>Payer of premium = <?php echo $businessName?></li>
      <li>Sum Assured paid to the company <?php echo $businessName?></li>
    </ul>
    <p>The cover will provide an immediate lump sum payment to the company.  </p>
<pagebreak>
    <h3>Quantifying the level of cover</h3>
    <p>In determining the appropriate amount of keyperson insurance cover an insurable value must be put on the potential financial loss that the company would suffer on the death <?php echo ($keyPersonAValue > 0 ? ' or serious illness' : '') ?> of the key individual.</p>
    
    <?php
      if(strlen($partnerNeedsLevelofCover) <=0){
    ?>
    <p>In this case the level of cover on the contract is related to the company’s profitability. </p>
    <p>You have chosen the level of cover based on a multiple of <?php echo ($keyPersonBValue == "net" ? ' Net Profit ' : ' Gross Profit ') ?> where <?php echo $keyPersonAName ?> makes a <?php echo $keyPersonBShare ?>% contribution to profit. </p>
   
    <?php
    }
    ?>

    <?php
      if(strlen($partnerNeedsLevelofCover) >=1){
    ?>
    <p><?php echo $partnerNeedsLevelofCover ?></p>
    <?php
      }
      ?>
    <p>The level of cover will also be subject to full medical and financial underwriting.</p>

     <h3>Board Resolution</h3>
    <p><?php echo $businessName?> should pass a Board Resolution recording their intention to affect Keyperson Insurance cover.  The resolution should cover the purpose for which the plan is being taken out. Sample board resolution is available in the Supporting Information section.</p>
    
    

    <h3>Tax Implications</h3>
    <p>As the purpose of the plan is to protect against loss of profits this is deemed to be a ‘Revenue’ item and the following tax treatment applies.</p>
    <!--<table class="drama">
      <tr>
        <th>Reason for cover</th><th>Sum Assured</th><th>Premium</th>
      </tr>
      <tr>
        <td>Loss of Profits / Replacement Costs</td><td>Yes – Taxable</td><td>Tax deductible if 4 conditions are met</td>
      </tr>
    </table>
    -->
    <p><u>Taxation of Plan Benefits – Loss of Profits (Revenue item)</u></p>
    <h4>Corporation Tax</h4>
    <p>As the plan is to protect “loss of profit” (if the profits were earned they would be subject to Corporation Tax) then the proceeds are likely to be treated as a “revenue receipt” or a trading receipt and <u>SUBJECT</u> to Corporation Tax.</p> 
    
    <h4>Capital Gains Tax</h4>
    <p>The proceeds of a company owned plan, paid out on death or disablement, are EXEMPT from Capital Gains Tax.</p>


    <h5><u>Taxation of Premium – Loss of Profits  (Revenue item)</u></h5>

    <h4>Tax Deductible for Corporation Tax</h4>
    <p><strong>Yes.</strong> If ALL of the following conditions are met;</p> 
        <ul>
      <li style="padding-bottom:2px;">The sole relationship is that of employer and employee,</li>
      <li style="padding-bottom:2px;">The employee has no substantial proprietary interest in the business,</li>
      <li style="padding-bottom:2px;">The insurance is intended to meet loss of profit resulting from the loss of the services of the employee as distinct from loss of goodwill or other capital loss, and, </li>
      <li style="padding-bottom:2px;">The plan is a short term insurance, providing only for a sum to be paid in the event of death.</li>
    </ul>

    <!--<p><i>The tax treatment of the plan benefits will depend on the purpose for which the plan is taken out, whether to cover a “Capital” or “Revenue” type loss. Where the cover is required for two different purposes i.e. loan cover and loss of profits cover, we would recommend two separate plans should be taken out.</i></p>-->
    <p><strong>IN ALL CASES THE CLIENT SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR BUSINESS AND CORPORATE CIRCUMSTANCES.	</strong></p>

  <?php
    if(strlen($BrokerProductDetails) >=1){
      ?>
      <pagebreak>
    <h3>Conclusion</h3>
    <p>Having considered the options that meet your need / objectives, I am now outlining how the specific features of the product type are suitable to meet your needs and why the product recommended is most suitable.</p>
    <p><?php echo $BrokerProductDetails; ?></p>

    <?php    
    };
    ?>
    
    <pagebreak>
    <h3>Supporting Information</h3>
    <strong>Revenue Clarification on Tax Deduction for premiums on Keyman Insurance Policies.</strong>
    <p>The following is an extract from a Circular issued by the Superintending Inspector of Taxes, dated July 1986, with regard to the admissibility of Keyman Insurance premiums as an allowable deduction for Corporation tax purposes.</p>
    <p><i>&quot;..the term 'Keyman' may be applied to a range of policies not all of which may give rise to admissible tax deductions and the allowability or otherwise of premiums paid will be determined by reference to the terms and purposes of the policy, rather than any description which the Insurance Company may give it. In applying the conditions (a), (b), (c), (d) '(see Section 4.2)' the following guidelines are followed:</i></p>
    <p><i>"Employee" is taken as including a Director.</i></p>
    <p><i>A person who directly or indirectly, owns or is able to control more than 15% of the ordinary share capital of a company is regarded as having a substantial proprietary interest in the company.</i></p>
    <p><i>The policy must be for a fixed term with no surrender value and no endowment or other investment content; it must not contain provisions whereby benefits could be paid to any person other than the employer.</i></p>

    <p><i>The insurance must be related to loss of profits only and it will be necessary to satisfy the Inspector of Taxes that the contingency insured against will genuinely have an adverse effect on the employers business.</i></p>
    <p><i>Premiums on policies taken out to cover loans or other outstanding debts which would become repayable on the death of an employee are not admissible deductions...."</i></p>
   
    <h3><i>Sample Board Resolution</i></h3>
    <p><i>"That the company shall effect a life assurance plan on the life of Mr X in the sum of €XXX,XXX. The purpose of this insurance is to meet the financial loss which the company is likely to suffer in the event of his death or serious illness whilst in the service of the Company.<br/><br/>Mr Y is hereby authorised to complete all necessary documentation on behalf of the company and it is hereby declared that the proceeds of this insurance are intended for the protection of the Company itself and are not for the benefit of Mr X or his family."</p>
    <p><strong>IN ALL CASES THE CLIENT SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR BUSINESS AND CORPORATE CIRCUMSTANCES.	</strong></p>


  </div>


