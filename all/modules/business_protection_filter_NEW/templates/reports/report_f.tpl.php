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
  <div class="front-img" style="background:url('<?php echo drupal_get_path('module', 'business_protection_filter');?>/images/corporate-shareholder-protection-report-cover.jpg') no-repeat;"><div class="front-author">Prepared for <?php echo $businessName ?></div></div>
  <pagebreak>
  <?
  ///////////////////////
  ///////////////////////
  ///////////////////////
  ///////////////////////
  // Front Letter

  // address & date
  ?>
  <div class="letter-address">
  <?
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
    <p>Please find enclosed your Corporate Shareholder Protection report.</p>
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

    
    <p>Corporate Shareholder Protection is an arrangement between a private trading company and one or more of its shareholders whereby the company:</p>
    <ul>
        <li>enters into an agreement with a shareholder to buy back their shares from their personal representatives on death,<br/>and</li>
        <li>takes out a life assurance plan on each shareholder covered by the agreement to provide funds to enable the company to complete the buy back.</li>
      </ul>
    <p>In the event of the death of the shareholder the funds from the life assurance plan are paid to the company to be used to buy back shares from the deceased's next of kin.</p>

    <h3>Corporate Shareholder Protection</h3>
    <p>The purpose of this report is to detail how a corporate shareholder protection arrangement would work to protect <?php echo $businessName?> against the death of a shareholder and provide the deceased’s next of kin with an immediate lump sum..  </p>
    <p>This report is based on the answers provided and the selected route chosen through the Business Protection Pathfinder. It is understood that cover is required by <?php echo $businessName?> for a corporate shareholder protection arrangement to buy back the shares of a shareholder on their death. </p>

    <h3>Company Details</h3>

    <table>
      <tr>
        <th>Shareholder</th><th>Share in Company</th><th>Estimated value of shareholding</th>
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
    <p>The company takes out a protection plan on each shareholder covered by the legal agreement. It is arranged in two steps:</p>
    <p><u>1. Life Assurance:</u></p>
    <p>The plan is arranged as follows:</p>
    <ul>
      <li>Life assured = shareholder</li>
      <li>Plan owner = <?php echo $businessName?></li>
      <li>Payer of premium = <?php echo $businessName?></li>
    </ul>
    <p>Sum Assured paid to the company <?php echo $businessName?></p>
    <i>Quantifying the level of cover</i>
    <p>The level of cover over all the contracts is the estimated value of the individuals share in the company. The level of cover will also be subject to full medical and financial underwriting.</p>
    <p><u>2.	Shareholders Legal Agreement:</u><br/>Each participating shareholder, whose shares are to be bought back on death, completes the legal agreement with the company.</p>
    <p>This allows the company to exercise a call option to compel the deceased’s personal representatives to sell the shares back to it at market value,<br/>or<br/>It allows the deceased’s personal representatives to exercise a put option to compel the company to buy the shares back from them at market value.</p>
  <p>If neither side exercise their options then the shares are not bought back and go through the deceased's estate to their next of kin.</p>
  
<pagebreak>
  <h3>Requirements</h3>

  <p>Certain company law provisions must be satisfied and formal approvals are required. In addition there are a number of conditions that must be satisfied to ensure the buy back of shares from the family of a deceased shareholder can be achieved in a tax efficient manner.</p>
    <strong>1. Check Constitution</strong>
    <p>If the company's constitution does not currently authorise it to purchase its own shares then it will need to be amended to allow such a purchase in accordance with the provisions of Part 3, Chapter 6 of the Companies Act 2014. A special resolution of the members of the company may be necessary to amend its constitution. <i>Further detail is outlined in the supporting information section.</i></p>

    <strong>2. Check that Capital Gains Tax Treatment applies</strong>
    <p>Before the legal agreement is entered into, it is important that all parties are satisfied that the sale of the shares by a deceased shareholder's personal representatives back to the company, is likely to qualify for capital gains tax treatment under section 61, Finance Act 1991.</p>
        <p>This will involve checking that all seven requirements, outlined in the Business Protection Pathfinder and in the supporting information section, are likely to apply.</p>

    <strong>3. Board Resolution</strong>
    <p>The decision to propose for these plans would normally be minuted at a board meeting of the company, specifying the reason for taking out the plan, i.e. to buy back a shareholder's shares on death.</p>

    <strong>4. Authorise the legal agreement</strong>
    <p>The legal agreement must be approved by a special resolution of the company.  Section 105 of the Companies Act 2014 contains specific requirements in relation to the passing of a resolution in relation to the acquisition by a company of its own shares and should be consulted before the acquisition proceeds.</p>
    <p>Under section 105 (5 ) of the Companies Act 2014  the special resolution will be ineffective if a member holding shares affected by the resolution exercises their voting rights in respect of the shares in favour of the resolution and it would not have been carried without their vote.</p>
    <p>Therefore to pass such a resolution in such circumstances, that shareholder would need to absent themselves from that meeting, and allow the other shareholders to vote through the special resolution with regard to their shareholding. <i>Further detail is outlined in the supporting information section.</i></p>

<pagebreak>
    <h3>Tax Implications</h3>
    <h5><u>Taxation of Plan Benefits</u></h5>

    <h4>Capital Gains Tax (CGT)</h4>
    <p>CGT will NOT apply to the sum assured. The proceeds of a company owned plan, paid out on death or disablement, are EXEMPT from Capital Gains Tax. So no tax liability arises for the company.</p> 
    
    <h4>Corporation Tax</h4>
    <p>If the plan is part of a corporate shareholder protection arrangement the proceeds are likely to be treated as a capital receipt for the company and thus NOT subject to Corporation Tax.</p>


    <h5><u>TAXATION OF PREMIUM</u></h5>
    <h4>Tax Deductible</h4>
    <p>No. The premiums are NOT admissible deductions for Corporation Tax.</p> 
    <h4>Sale of the share in the company by the deceased’s personal representatives</h4>
    <h4>Capital Gains Tax (CGT)</h4>
    <p>Where a company buy’s back its own shares, any excess paid by the company over the original investment, is treated as a ‘distribution’ rather than a capital gain.</p> 
    <p>This means that, where a company is buying its own shares, the seller would be liable to income tax on the gross amount of the ‘distribution’. This would make the buy back of shares by the company very unattractive to sellers.</p>
    <p>However, if certain conditions are met, the sale of shares back to the company can be treated as a ‘disposal’. This means CGT treatment will apply to the sale and not income tax.</p>
    <p>Everyone who is part of the arrangement must be satisfied that the sale of the shares by a deceased shareholder’s estate back to the company, will qualify for CGT treatment by ensuring that they meet all the conditions as set out earlier in the Business Protection Pathfinder.</p>
    <p>If CGT treatment applies, then any CGT liability would only arise on any increase in value of the shares from the date of death to the date of sale. As this period is unlikely to be more than a few months, as set out in the Legal Agreement, a CGT liability is likely to be small.</p>
    <h4>Inheritance Tax</h4>
    <p>The value received for the deceased shareholders share in the business could give rise to an inheritance tax liability for the deceased’s estate. As they are selling the share in the business ‘Business Relief’ from Inheritance Tax will not apply.</p>

    <p><strong>IN ALL CASES SHAREHOLDERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND CORPORATE CIRCUMSTANCES.</strong></p>
    
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
      <H2>Supporting Information</H2>
    <h4>Companies Act 2014</h4>
    <p>Part 3, Chapter 6 of the Companies Act 2014 allows a company to buy back its own shares in certain circumstances and subject to certain conditions. The information below is a summary only of the provisions of Part 3, Chapter 6 of the Companies Act 2014 and we recommend that you take appropriate legal advice before you proceed. </p>
    <p><i>Key Provisions of Part 3, Chapter 6 of the Companies Act 2014</i></p>
    <p>A company can only acquire its own shares 'out of profits available for distribution', or in certain cases, from the proceeds of a fresh issue of shares made for the purposes of the acquisition;</p>
    <p>The company must be authorised to acquire its own shares by-</p>
    <ul>
      <li>the Company’s constitution;</li>
      <li>the rights attaching to the shares in question; or</li>
      <li>a special resolution of the Company. </li>
    </ul>
    <p>A company cannot buy back all its own shares;</p>
    <p>A company can buy back its own shares under a contingent purchase contract, provided the contract has been authorised by a special resolution (e.g. a Put and Call Option Agreement under which the company could exercise a Put option on the death of a shareholder to buy back his shares would be considered to be a contingent purchase contract, the contingency being the death of the shareholder.); and<br/>Where a purchase of shares is proposed to be authorised by way of special resolution, the following provisions apply;</p>
    <p>the proposed purchase contract must be made available to any members who request it or alternatively made available for inspection by the members at the registered office of the Company from the date of the notice of the meeting at which the resolution to purchase the shares is proposed to be approved, and at the meeting itself; </p>
    <p>under section 105(5) of the Companies Act 2014 the special resolution will be ineffective if a member holding shares affected by the resolution exercises his voting rights in respect of the shares in favour of the resolution and it would not have been carried without his vote; and</p>
    <p>the terms of such a contract to purchase its own shares may only be subsequently varied revoked, or renewed by a further special resolution.</p>
    <pagebreak>
      <h4>CAPITAL GAINS TAX TREATMENT ON SALE OF SHARES TO COMPANY</h4>
    <p>In certain circumstances where a company redeems its shares, any amount paid by the company in excess of the original issue price is treated as a 'distribution' rather than a capital gain.</p>
    <p>The implications of this treatment, with regard to a company purchasing its own shares as a result of a corporate shareholder protection arrangement, would be as follows:</p>
    <p>a) The company would be obliged to apply Dividend Withholding Tax (“DWT”) at the standard rate of 20% on the distribution, and</p>
    <p>b) The vendor of the shares would be liable to income tax under Schedule F on the gross amount of the distribution.</p>
    <p>The income tax treatment outlined above would obviously make the purchase of shares by the company unattractive to most vendors.</p>
    <p>Section 176 of TCA 1997 provides that <u>the purchase by an unquoted trading company of its own shares will not be treated as a distribution, subject to certain requirements being fulfilled</u>. In this case the sale of the shares by the vendor to the company would be treated as a disposal for Capital Gains Tax purposes.</p>
    <p>The vendor must meet seven separate requirements to obtain the Capital Gains Tax treatment on the sale of his shares to the company. These can be summarised as follows:</p>
    <ol>
      <li>The company must be an <u>unquoted trading company</u>.</li>
      <li>The purchase of the shares by the company must be for the benefit of the trade</li>
      <li>The purchase of the shares by the company must not be part of any scheme to enable the shareholders to benefit from the profits of the company without taking a dividend.</li>
      <li>The vendor of the shares must be resident and ordinarily resident in the State for the year when the shares are purchased.</li>
      <li>The shares must be owned by the vendor for at least 5 years before the shares are purchased, or 3 years if the shares are being purchased on death.</li>
      <li>The vendor and his associates - i.e. spouse or civil partner and children under 18 living with their parents - must reduce their shareholding by at least 25%, as a result of the purchase.</li>
      <li>The vendor and his associates combined must have less than 30% of the equity of the company after the purchase.</li>
    </ol>
    <h5>ALL TESTS MUST BE MET TO QUALIFY FOR CAPITAL GAINS TAX TREATMENT.</h5>
    <pagebreak>
    <h3>TAXATION OF LIFE ASSURANCE POLICIES</h3>
    <h4>PREMIUMS</h4>
    <p>Premiums paid by the Company on Corporate Co-Director's Insurance will, under current Revenue Practice, not be an allowable deduction for Corporation Tax purposes.</p>
    <p>Revenue clarification on the taxation of Keyman Insurance Policies, issued in July 1986, require four separate conditions to be met in order for premiums to be admissible deduction for Corporation Tax purposes:</p>
    <p>(i) The relationship between the company and the insured life is that of employer and employee. The term 'employee' in this context is taken as including a director.</p>
    <p>(ii) The employee must have no substantial proprietary interest in the business. A person is regarded as having a substantial proprietary interest in a company if he has more than 15% of the ordinary share capital.</p>
    <p>(iii) The life assurance is intended to meet loss of profit resulting from the loss of the services of the employee as distinct from loss of goodwill or other capital loss. Premiums on policies taken out to cover loans or other outstanding debts which would become repayable on the death of an employee are not admissible deductions.</p>
    <p>(iv) The life policy must be for a fixed short term, usually less than 5 years, and have no surrender value or investment content.</p>
    <p>The term 'keyman' in the Revenue's clarification is taken as applying to a wide range of policies, where an employer takes out 'in his own favour a policy insuring against death, sickness, or injury of an employee'.</p>
    <p>In this context life assurance policies effected by a company as part of a Corporate Co-Director's Insurance arrangement can be taken as 'keyman' policies.</p>
    <p>In the case of premiums paid by a company as part of a Corporate Co-Director's Insurance it is likely that requirements (ii) and (iii) will not be met in most cases and hence the premiums will not be admissible deductions for Corporation Tax purposes.</p>
    <h4>PROCEEDS</h4>
    <p>The Revenue clarification on the taxation of Keyman Insurance policies says:</p>
    <p>'While the allowability of a premium or the chargeability of a benefit are strictly separate issues, it will usually be the case that, if the premiums are allowable for tax purposes, the benefit is chargeable to tax and, if the premiums are not allowable, the benefit is not chargeable.'</p>
    <p>Therefore if it is perfectly clear from the circumstances that the sole purpose in effecting the Corporate Co-Director's Insurance policy is capital in nature, i.e. to enable the company to purchase a deceased shareholder's shares, then the premium is clearly not deductible for tax purposes (see (iii) above). </p>
    <p>Therefore the proceeds of the policy payable on death or surrender would, under current Revenue practice and law be treated for tax purposes as a capital rather than a taxable trading receipt.</p>
    <p>Section 593 of the TCA 1997, exempts the proceeds of life assurance policies from capital gains tax, where the policy has remained in the beneficial ownership of the Company throughout. No tax liability on the proceeds should therefore arise under current legislation.</p>
    <p>The above refers to the payment of policy proceeds in the event of death or disablement of a ”keyman”.  Here once the proceeds are treated as a capital as opposed to a revenue receipt for the company the proceeds will be exempt from capital gains tax on death or disablement</p>
    <br/>
    <br/>

    <p><strong>IN ALL CASES SHAREHOLDERS SHOULD SEEK PROFESSIONAL LEGAL AND TAX ADVICE BEFORE PROCEEDING TO ASCERTAIN IF THE ARRANGEMENT IS LIKELY TO BE APPROPRIATE TO THEIR PERSONAL AND CORPORATE CIRCUMSTANCES.
	</strong></p>
  </div>


