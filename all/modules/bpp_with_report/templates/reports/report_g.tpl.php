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
  <div class="front-img" style="background:url('<?php echo drupal_get_path('module', 'bpp_with_report');?>/images/personal-shareholder-protection-report-cover.jpg') no-repeat;"><div class="front-author">Prepared for <?php echo $businessName ?></div></div>
  <pagebreak>

  <div class="letter-address">
  <?php
    echo $clientName.' <br/>';
    echo $businessName.' <br/>';
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
    <p>Please find enclosed your Personal Shareholder Protection report. </p>
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
    if(strlen($brokerNeedsObj) >=1){
    ?>
      <p>Following an analysis of the businesses financial circumstances and based on the information you have provided, our understanding of the businesses requirements are as follows:</p>
    <h3>Needs and Objectives</h3>
    <p> <?php echo $brokerNeedsObj ?></p>
    <?php
    }
    ?>
    <p>Personal shareholder protection is an arrangement whereby the shareholders enter into a personal legal agreement to buy out a deceased shareholders family in the event of their death.</p>
    <p>To make sure they have the funds to fulfil their personal obligation under the agreement each shareholder personally effects life assurance cover which will be paid to the surviving shareholders on their death.</p>
    <p>The surviving shareholders then use the funds to buy out the deceased's next of kin in line with the legal agreement.</p>

    <h3>Personal Shareholder Protection</h3>
    <p>The purpose of this report is to detail how a personal shareholder protection arrangement would work to protect <?php echo $businessName ?> against the death of a shareholder and provide the deceased’s next of kin with an immediate lump sum.</p>
    <p>This report is based on the answers provided and the selected route chosen through the Business Protection Pathfinder. It is understood that cover is required by <?php echo $businessName ?> for personal shareholder protection. </p>

    <h3>Company Details</h3>
    <table>
      <tr>
        <th>Shareholder</th><th>Share in Company</th><th>Estimated value of the share</th>
      </tr>
      <tr>
        <td><?php echo $keyPersonAName ?></td><td><?php echo $keyPersonAShare ?>%</td><td>&euro; <?php echo number_format($partnerNeedsLevelofCover*($keyPersonAShare/100)) ?></td>
      </tr>
      <?php
        if(strlen($keyPersonBName)>=1){
          echo '<tr><td>'.$keyPersonBName.'</td><td>'.$keyPersonBShare.'%</td><td>&euro; '.number_format($partnerNeedsLevelofCover*($keyPersonBShare/100)).'</td></tr>';
        }
        if(strlen($keyPersonCName)>=1){
          echo '<tr><td>'.$keyPersonCName.'</td><td>'.$keyPersonCShare.'%</td><td>&euro; '.number_format($partnerNeedsLevelofCover*($keyPersonCShare/100)).'</td></tr>';
        }
        if(strlen($keyPersonDName)>=1){
          echo '<tr><td>'.$keyPersonDName.'</td><td>'.$keyPersonDShare.'%</td><td>&euro; '.number_format($partnerNeedsLevelofCover*($keyPersonDShare/100)).'</td></tr>';
        }
        if(strlen($keyPersonEName)>=1){
          echo '<tr><td>'.$keyPersonEName.'</td><td>'.$keyPersonEShare.'%</td><td>&euro; '.number_format($partnerNeedsLevelofCover*($keyPersonEShare/100)).'</td></tr>';
        }
      ?>  
    </table>
<pagebreak>
    <h3>Structuring the Arrangement</h3>
    <p>The arrangement provides money on the death of a shareholder to allow the surviving shareholders to buy out the deceased’s share in the company from their estate. It is arranged in two steps:</p>
    <h4>1. Life Assurance</h4>
    <p>Based on the company’s particular circumstances you have chosen to arrange cover on a life of another basis.</p>
      <ul>
        <li>Each shareholder who has signed up to the legal agreement takes out a protection plan on the life of the other shareholders.</li>
        <li>The total level of cover on each shareholder over all plans should equal the total value of their share of the company.</li>
        <li>The owner of each plan pays the premium on the plan.</li>
      </ul>

    <h5>Quantifying the level of cover</h5>
    <p>The level of cover over all the contracts is the estimated value of the individuals share in the company. The level of cover will also be subject to full medical and financial underwriting.</p>
    
    <h4>2. Shareholders Legal Agreement:</h4>
    <p>All of the shareholders who are to benefit from the arrangement are party to the one legal agreement. This can be framed as a double option agreement that provides in the event of the death of a shareholder to allow:</p>
          <ul>
        <li>the surviving shareholders to exercise an option to compel the deceased's personal representatives to sell the deceased’s share in the company, or,</li>
        <li>the deceased's personal representatives to exercise an option to compel the surviving shareholders to buy the deceased’s share in the firm at the market value.</li>
      </ul>
<p>If neither side exercise their options then the share is not bought back and goes through the deceased's estate to their next of kin.</p>
    <pagebreak><h3>Tax Implications</h3>
    <u>TAXATION OF PLAN BENEFITS – Life of Another</u>
    <h4>Capital Gains Tax (CGT)</h4>
    <p>Capital Gains Tax will NOT apply to the sum assured. The proceeds of the personal shareholder protection arrangement payable on death are not liable to Capital Gains Tax under current legislation.</p>
    <h4>Inheritance Tax</h4>
    <p>Inheritance Tax will NOT apply.</p>
    <p>On death the proceeds of the plan are paid to the plan owner. Under current legislation there will be no inheritance tax liability for the surviving shareholder (the plan owner) provided they have paid the premium for the benefit they will receive.</p>

    <h3>Sale of the share in the company by the deceased’s personal representatives</h3>
    <h4>Capital Gains Tax (CGT)</h4>
    <p>The proceeds from the sale of the share in the company <u>would be liable</u> to CGT in the hands of the personal representatives of the deceased. However a liability to tax would only arise on any increase in the value of the business from the date of death of the shareholder to the date of sale and, as such, is likely to be small. This time frame should be set out in the legal agreement.</p>
    
    <h4>Inheritance Tax</h4>
    <p>The value received for the deceased shareholders share in the business could give rise to an inheritance tax liability for the deceased’s estate. As they are selling the share in the business ‘Business Relief’ from Inheritance Tax will not apply.</p>
    <h4>IN ALL CASES PARTNERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND BUSINESS CIRCUMSTANCES.</h4>
    
    
  <?php
    if(strlen($BrokerProductDetails) >=1){
      ?><pagebreak>
    <h3>Conclusion</h3>
    <p>Having considered the options that meet your need / objectives, I am now outlining how the specific features of the product type are suitable to meet your needs and why the product recommended is most suitable.</p>
    <p><?php echo $BrokerProductDetails; ?></p>

    <?php    
    };
    ?>
<pagebreak>
    
    <h3>Supporting Information</h3>
    <strong>Revenue Clarification on Taxation of Shareholder Protection Insurance</strong>
    <strong>Policies written under trust.</strong>
    <p>The following is an extract of a letter written by the Office of the Revenue Commissioners (Capital Taxes Branch) to the Irish Insurance Federation in June 1992:</p>
    <strong>Re: Shareholder Protection Assurance</strong>
    <p><i>"Essentially we are dealing here with policies which are effected purely for commercial purposes and agreed between the individual partners/shareholders on an arms length basis without any intention to make a gift.</i></p>
     <p><i>The Revenue approach to such policies, written in the form of own life in trust for others, is to treat the proceeds as exempt from Inheritance Tax in the following circumstances: -</i></p>
     <p><i>(i) Proceeds on death will be used to purchase deceased's shareholding.  Any surplus arising will be liable to Inheritance Tax.</i></p>
     <p><i>(ii) The capital sum under each policy will reflect the policyholder's shareholding.</i></p>
     <p><i>(iii) Payment of premiums will be made by the individual members or on their behalf by the company or partnership out of the individual's own company or partnership account.</i></p>
      <p><i>(iv) New partner(s)/shareholder(s) can join the arrangement at any time, subject to the conditions applicable to the existing members of the plan.</i></p>
     <p><i>(v) On withdrawal from the company or on retirement, the policy of the partner who leaves will revert to himself and he will no longer benefit in the continuing arrangement, provided he sells his shareholding on withdrawal, otherwise he can remain a party to the arrangement.  Such policy will be an asset in his estate on his death and will not be exempt from Inheritance Tax.</i></p>
     <p><i>(vi) On the death of a sole surviving partner or shareholder the policy on his life will be an asset in his estate and will not be exempt from Inheritance Tax.  Similarly, if a partnership breaks up or a company is wound up, policies, which do not lapse, will be liable on death to Inheritance Tax.</i></p>
     <p><i>(vii) Where a partner refuses to join the arrangement or is unable to effect life insurance on medical grounds, then he will be precluded from benefiting from the policies of his co-shareholders.</i></p>
     <p><i>(viii) The insurance policies can either be Term Insurance, Endowment or Whole of Life policies, with the Death Benefit only passing to the surviving shareholders.</i></p>
     <p><i>(ix) Company Directors/Partnership Insurance using Own Life in Trust must be supported	by relevant documentation:</i></p>
     <p><i>(a)	Buy/Sell (or Double Option) Agreement.</i></p>
     <p><i>(b)	Reciprocal Agreement.</i></p>
     <p><i>(c)	Trust Document.</i></p>




    <p><strong>IN ALL CASES SHAREHOLDERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND CORPORATE CIRCUMSTANCES</strong></p>
  </div>
