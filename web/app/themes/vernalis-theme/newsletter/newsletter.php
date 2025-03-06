<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }
      body {
        background-color: #f6f6f6;
        -webkit-font-smoothing: antialiased;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%; }
        table td {
          vertical-align: top;
      }
      .body {
        background-color: #f6f6f6;
        width: 100%;
      }
      .newsletter .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px;
      }
      .newsletter .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px;
      }
      .newsletter .content table {
        width: 600px;
        max-width: 600px;
      }

    </style>
  </head>
  <body class="newsletter">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container" style="text-align: center;">
          <div class="content"><table cellpadding="0" cellspacing="0" style="text-align: left; width: 600px; max-width: 600px; background-color: #fff; margin: 0 auto; border: 1px solid #6E6E6E; color:#6E6E6E;" width="600" bgcolor="#fff">
                    <tr>
                        <td colspan="3">
                            <a href="<?php echo get_home_url(); ?>" target="_blank"><img id="image_logo_newsletter" src="<?php echo get_stylesheet_directory_uri(); ?>/newsletter/images/newsletter.png" alt="16-19" border="0" width="600" height="77" /></a>
                        </td>
                    </tr>
                    <tr style="background-color: #F4F4F4; text-align: center;">
                        <td colspan="3" height="14">&nbsp;</td>
                    </tr>
                    <tr style="background-color: #F4F4F4; text-align: center;">
                        <td width="3">&nbsp;</td>
                        <td id="header_news" style="text-align: center; font-size:18px !important; mso-line-height-rule:exactly; line-height:17px;"><?php echo $intro; ?></td>
                        <td width="3">&nbsp;</td>
                    </tr>
                    <tr style="background-color: #F4F4F4; text-align: center;">
                        <td colspan="3" height="14">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3" height="14">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <table id="inner_table" width="600">
                                <tbody id="insert_after">
                                  <?php 
                                  foreach ($tab_spectacle as $spectacle) {
                                  ?>
                                    <tr>
                                      <td width="3"></td>
                                      <td>
                                        <a href="" style="text-decoration:none;color:#6e6e6e" target="_blank">
                                          <table width="600" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td width="103" valign="top" align="left">
                                                  <img src="<?php echo $spectacle['image']; ?>" width="100" border="0">
                                                </td>
                                                <td style="color:#000;padding-left:5px;vertical-align:top;font-size:14px!important;line-height:14px" valign="top">
                                                  <span style="font-weight:bold;text-transform:uppercase;font-size:18px!important;line-height:16px">
                                                    <?php echo $spectacle['titre']; ?>
                                                  </span><br>
                                                  <span style="font-weight:bold;text-transform:uppercase;font-size:16px!important;line-height:16px;color:#6e6e6e">ONE MAN SHOW</span><br>
                                                  <span style="font-weight:bold;font-size:14px!important;line-height:16px;color:#000">
                                                  <?php echo $spectacle['dates']; ?><br>
                                                  Lieu : <?php echo $spectacle['lieu']; ?><br>
                                                  </span><br>
                                                  <span style="font-size:12px!important;color:#6e6e6e">
                                                  <?php echo $spectacle['texte']; ?>
                                                  </span>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </a>
                                      </td>
                                      <td width="3"></td>
                                    </tr>
                                  <?php 
                                  }
                                  ?>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" height="14">&nbsp;</td>
                    </tr>
                    <tr>
                        <td width="3" height="1" style="height:1px; font-size:1px !important; mso-line-height-rule:exactly; line-height:1px;">&nbsp;</td>
                        <td bgcolor="#58585A" class="links_footer_separator_color" height="1" style="background-color:#58585A; height:1px; font-size:1px !important; mso-line-height-rule:exactly; line-height:1px;">&nbsp;</td>
                        <td width="3" style="height:1px; font-size:1px !important; mso-line-height-rule:exactly; line-height:1px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3" height="6">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:center; font-size:10px !important; mso-line-height-rule:exactly; line-height:11px; color:#6E6E6E;"><a href="http://quai13.com" target="_blank" style="color:#6E6E6E; text-decoration:none;">Envoyé par Quai13.com</a></td>
                    </tr>
                    <tr style="height:50px;">
                        <td colspan="3"><center style="mso-line-height-rule:exactly; line-height:11px; font-size:10px !important;"><br />Email envoye a *|EMAIL|*. <br /><a href="*|UNSUB|*" style="color:#000; text-decoration:none;">Cliquez ici pour vous desinscrire</a> ou copiez-collez ce lien dans votre navigateur : <br />*|UNSUB|*</center></td>
                    </tr>
                </table>
          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>