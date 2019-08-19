<?php

  // the variables are posted to the PDF page
  // They are not sent over URL (GET)
  $clientName =  $_POST['clientName'];
  $clientAddress =  $_POST['clientAddress'];
  $businessName =  $_POST['businessName'];
  $businessAddress =  $_POST['businessAddress'];
  $brokerName =  $_POST['brokerName'];

  $brokerNeedsObj =  nl2br($_POST['brokerNeedsObj'])  ; //free text box for broker

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
  <div class="front-img" style="background:url('<?php echo drupal_get_path('module', 'bpp_with_report');?>/images/partnership-insurance-report-cover.jpg') no-repeat;"><div class="front-author">Prepared for <?php echo $businessName ?></div></div>
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
    echo $businessName.' <br/>';
    echo (strlen($clientAddress[0]['line1']) >=1) ? $clientAddress[0]['line1'].' <br/>' : '';
    echo (strlen($clientAddress[0]['line2']) >=1) ? $clientAddress[0]['line2'].' <br/>' : '';
    echo (strlen($clientAddress[0]['line3']) >=1) ? $clientAddress[0]['line3'].' <br/>' : '';
    echo (strlen($clientAddress[0]['line4']) >=1) ? $clientAddress[0]['line4'].' <br/>' : '';
    echo "<br/>";
    echo $today.' <br/>';
  ?>
  </div>
  <div class="letter-salutation">
  Dear <?php echo $clientName ?>,
  </div>
  <div class="letter-body">
    <p>Thank you for taking the time to meet me and discuss the financial planning requirements for your business. I am now confirming the outcome of our meeting.</p>
    <p>Please find enclosed your Partnership Insurance report.</p>
    <p>This report is based on the details gathered at our meeting and provides you with details of the option that might suit your particular business requirements.</p>
    <p>I will be in contact with you shortly to discuss implementing the option that you have chosen.</p>
    <p>In the meantime, if you have any questions, please do not hesitate to contact me.</p>
  </div>
  <div class="letter-signoff">
    Yours sincerely,<br/>
    <?php echo $brokerName ?>
  </div>
    <pagebreak>

  <div class="report">

    <p>Partnership insurance provides the partnership with the necessary funds to protect both sides in the event of a partner’s death:</p>
    <p>It allows the surviving partners retain control of the partnership by buying back the deceased’s share in the firm,<br/><br/>and<br/><br/>It ensures that the deceased’s next of kin are able to turn the deceased’s share immediately into cash at a fair price.</p>
        <?php
    if(strlen($brokerNeedsObj) >=1){
      ?>
    <p>Following an analysis of the businesses financial circumstances and based on the information you have provided, our understanding of the businesses requirements are as follows:</p>
        <?php
    if(strlen($brokerNeedsObj) >=1){
      ?>
      <h3>Needs and Objectives</h3>
      <p> <?php echo $brokerNeedsObj ?></p>
      <?php
      }
    }
    ?>

    <h3>Partnership Insurance</h3>
    <p>The purpose of this report is to detail how a partnership insurance arrangement would work to protect <?php echo $businessName?> against the death of a partner and provide that partners next of kin with immediate lump sum. </p>
    <p>This report is based on the answers provided and the selected route chosen through the Business Protection Pathfinder. It is understood that cover is required by <?php echo $businessName?> for partnership insurance.</p>

    <h3>Partnership Details</h3>

    <table>
      <tr>
        <th>Partner</th><th>Share in Partnership</th><th>Estimated value of share</th>
      </tr>
      <tr>
        <td><?php echo $keyPersonAName ?></td><td><?php echo $keyPersonAShare ?>%</td><td>&euro; <?php echo number_format($keyPersonAValue) ?></td>
      </tr>
      <?php
        if(strlen($keyPersonBName)>=1){
          echo '<tr><td>'.$keyPersonBName.'</td><td>'.$keyPersonBShare.'%</td><td>&euro; '.number_format($keyPersonBValue).'</td></tr>';
        }
        if(strlen($keyPersonCName)>=1){
          echo '<tr><td>'.$keyPersonCName.'</td><td>'.$keyPersonCShare.'%</td><td>&euro; '.number_format($keyPersonCValue).'</td></tr>';
        }
        if(strlen($keyPersonDName)>=1){
          echo '<tr><td>'.$keyPersonDName.'</td><td>'.$keyPersonDShare.'%</td><td>&euro; '.number_format($keyPersonDValue).'</td></tr>';
        }
        if(strlen($keyPersonEName)>=1){
          echo '<tr><td>'.$keyPersonEName.'</td><td>'.$keyPersonEShare.'%</td><td>&euro; '.number_format($keyPersonEValue).'</td></tr>';
        }
      ?>  
    </table>
<pagebreak>
    <h3>Structuring the Arrangement</h3>
    <p>The arrangement provides money on the death of a partner to allow the surviving partners to buy out the deceased partners share in <?php echo $businessName?> from their estate. It is arranged in two steps:</p>
    <h4>1. Life Assurance</h4>
    <p>Based on the partnerships particular circumstances you have chosen to arrange cover on a life of another basis.</p>
      <ul>
        <li>Each partner who has signed up to the legal agreement takes out a protection plan on the life of the other partners.</li>
        <li>The total level of cover on each partner over all plans should equal the total value of their share of the partnership.</li>
        <li>The owner of each plan pays the premium on the plan.</li>
      </ul>

    <h5>Quantifying the level of cover</h5>
    <p>The level of cover over all the contracts is the estimated value of the individuals share in the business. The level of cover will also be subject to full medical and financial underwriting.</p>
    <p>The &quot;Life of Another&quot; method is simple and straightforward. The proceeds of the plan are, under current legislation, free from personal tax in the hands of the plan owner provided they have paid the premium.</p>
    
    <h4>2. Partnership Legal Agreement:</h4>
    <p>The agreement should outline the precise entitlement of each partner’s estate in the event of a partner’s death. All participating partners enter into this agreement.</p>
    <p>The existing partnership agreement may need to be amended, or a separate agreement drafted, to provide for the purchase and sale of a deceased partner&#39;s share of the business on death.</p>
    <p>It can be framed as a Double Option agreement that provides in the event of the death of a partner to allow:</p>
    <ul><li>the <strong>surviving partners to exercise an option</strong> to compel the deceased&#39;s personal representatives to sell the deceased’s share in the firm, or,</li><li>the <strong>deceased&#39;s personal representatives to exercise an option</strong> to compel the surviving partners to buy the deceased’s share in the firm at the market value.</li></ul>
    <p>If neither side exercise their options then the share is not bought back and goes through the deceased&#39;s estate to their next of kin.</p>
    <pagebreak>
    <h3>Tax Implications</h3>
    <u>TAXATION OF PLAN BENEFITS – Life of Another</u>
    <h4>Capital Gains Tax (CGT)</h4>
    <p>CGT will NOT apply to the sum assured. The proceeds of the partnership insurance arrangement payable on death are not liable to CGT under current legislation.</p>
    <h4>Inheritance Tax</h4>
    <p>Inheritance Tax will NOT apply.</p>
    <p>On death the proceeds of the plan are paid to the plan owner. Under current legislation there will be no inheritance tax liability for the surviving partner (the plan owner) provided they have paid the premium for the benefit they will receive.</p>

    <h3>Sale of the share in the partnership by the deceased’s personal representatives</h3>
    <h4>Capital Gains Tax</h4>
    <p>The proceeds from the sale of the share in the partnership would be liable to CGT in the hands of the personal representatives of the deceased. However a liability to tax would only arise on any increase in the value of the business from the date of death of the partner to the date of sale and, as such, is likely to be small. This should be set out in the legal agreement.</p>
    <h4>Inheritance Tax</h4>
    <p>The value received for the deceased partner’s share in the business could give rise to an inheritance tax liability for the deceased’s estate. As they are selling the share in the business ‘Business Relief’ from Inheritance Tax will not apply.</p>
    <h4>IN ALL CASES PARTNERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND BUSINESS CIRCUMSTANCES.</h4>  

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
    <strong>Revenue Clarification on Taxation of Partnership Insurance Policies written under trust.</strong>
    <p>The following is an extract of a letter written by the Office of the Revenue Commissioners (Capital Taxes Branch) to the Irish Insurance Federation in June 1992:</p>
    <p><strong>Re: Shareholder Protection Assurance</strong></p>
    <p><i>&quot;Essentially we are dealing here with policies which are effected purely for commercial purposes and agreed between the individual partners/shareholders on an arms length basis without any intention to make a gift.</i></p>
    <p><i>The Revenue approach to such policies, written in the form of own life in trust for others, is to treat the proceeds as exempt from Inheritance Tax in the following circumstances: -</i></p>
    <p><i>Proceeds on death will be used to purchase deceased&#39;s shareholding. Any surplus arising will be liable to Inheritance Tax.</i></p>
    <p><i>The capital sum under each policy will reflect the policyholder&#39;s shareholding.</i></p>
    <p><i>Payment of premiums will be made by the individual members, or on their behalf by the company/ partnership out of the individual&#39;s own company/partnership account.</i></p>
    <p><i>New partner(s)/shareholder(s) can join the arrangement at any time, subject to the conditions applicable to the existing members of the plan.</i></p>
    <p><i>On withdrawal from the company or on retirement, the policy of the partner who leaves will revert to himself and he will no longer benefit in the continuing arrangement, provided he sells his shareholding on withdrawal, otherwise he can remain a party to the arrangement. Such policy will be an asset in his estate on his death and will not be exempt from Inheritance Tax.</i></p>
    <p><i>On the death of a sole surviving partner or shareholder the policy on his life will be an asset in his estate and will not be exempt from Inheritance Tax. Similarly, if a partnership breaks up or a company is wound up, policies, which do not lapse, will be liable on death to Inheritance Tax.</i></p>
    <p><i>Where a partner refuses to join the arrangement or is unable to effect life insurance on medical grounds, then he will be precluded from benefiting from the policies of his co-shareholders.</i></p>
    <p><i>The insurance policies can either be Term Insurance, Endowment or Whole of Life policies, with the Death Benefit only passing to the surviving shareholders.</i></p>
    <p><i>Partnership Insurance using Own Life in Trust must be supported by relevant documentation:</i></p>
    <p style="padding-left:100px;"><i>(a) Buy/Sell (or Double Option) Agreement.</i></p>
    <p style="padding-left:100px;"><i>(b) Reciprocal Agreement.</i></p>
    <p style="padding-left:100px;"><i>(c) Trust Document.</i></p>
    <p><strong>IN ALL CASES PARTNERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND BUSINESS CIRCUMSTANCES.</strong></p>
  </div>

