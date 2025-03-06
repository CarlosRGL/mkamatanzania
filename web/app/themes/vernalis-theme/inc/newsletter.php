<?php 
class Mailchimp 
{

    public static function setNewSubscriber ($t_params)
    {
        $salle = get_post($t_params['salle']);
        $list = get_field('id_mailchimp', $salle->ID);
        $authToken = get_field('api_key', 'option');
        $merge_vars = array('FNAME'=> $t_params["news_first_name"], 'LNAME'=> $t_params["news_last_name"]);
        $postData = array(
            "email_address" => $t_params["news_mail"], 
            "status" => "subscribed", 
            "merge_fields" => $merge_vars
        );
        $ch = curl_init(get_field('api_url', 'option') . '/lists/'.$list.'/members/');
        curl_setopt_array($ch, array(
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Authorization: apikey '.$authToken,
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));
        $response = curl_exec($ch);
    }

    public static function sendCampaign($t_param)
    {
        $type = 'regular';
        $salle = get_post($t_param['salle']);
        $list = get_field('id_mailchimp', $salle->ID);
        $authToken = get_field('api_key', 'option');
        $opts['type'] = $type;
        $opts['recipients']['list_id'] = $list;
        $opts['settings']['subject_line'] = $t_param["campaign_subject"];
        $opts['settings']['reply_to'] = get_field('email_reponse', 'option');
        $opts['settings']['from_name'] = get_field('from', 'option');
        $opts['tracking'] = array('opens' => true, 'html_clicks' => true, 'text_clicks' => false);
        $opts['settings']['authenticate'] = true;
        $opts['settings']['title'] = get_field('title', 'option');
        $opts['settings']['generate_text'] = true;
        $opts['settings']['auto_footer'] = false;

        $add_header = <<<EOH
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
                    <title>
EOH;
$add_header .= $t_param["campaign_subject"];
$add_header .= <<<EOH
 </title>
                    <style type="text/css">
                    // For Hotmail
                    *{
                        line-height:0px !important;
                    }
                    .EditArea, .ExternalClass{
                        font-size:0;
                    }

                    .ReadMsgBody .ExternalClass{
                        display:block;
                        width:100%;
                    }
                    .ReadMsgBody {
                        width: 100%;
                    }
                    .ExternalClass {
                        width: 100%;
                        background-color:#DCDCDC;
                    }

                    div.readtext{
                        font-size:0;
                    }

                    .DefaultFont, body, body.IE_M7, body.IE_M8, body.Win6, textarea, select, input, .c_hf input, button, .c_h .signOut, .EditArea, .ExternalClass{
                        font-family: Arial;
                    }

                </style>
            </head>
            <body style="margin:auto; width:606px; font-size:11px; mso-line-height-rule:exactly; line-height:0px; font-family:Arial;">
EOH;

        $add_footer = "
            </body>
        </html>";

        $html_to_send = trim($add_header) . trim($t_param["html_to_save"]) . trim($add_footer);
        $content = array('html' => $html_to_send);

        $ch = curl_init(get_field('api_url', 'option') . '/campaigns');
        curl_setopt_array($ch, array(
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Authorization: apikey '.$authToken,
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($opts)
        ));
        $response = curl_exec($ch);
        if (curl_errno($ch)) { 
            print curl_error($ch); 
         } 
        $campaign = json_decode($response);

        if (!$campaign->id) {
            echo "Unable to Create New Campaign!";
        } else {
            $ch = curl_init(get_field('api_url', 'option') . '/campaigns/' . $campaign->id . '/content');
            curl_setopt_array($ch, array(
                CURLOPT_CUSTOMREQUEST => "PUT",
                CURLOPT_RETURNTRANSFER => TRUE,
                CURLOPT_HTTPHEADER => array(
                    'Authorization: apikey '.$authToken,
                    'Content-Type: application/json'
                ),
                CURLOPT_POSTFIELDS => json_encode($content)
            ));
            $response = curl_exec($ch);

            $ch = curl_init(get_field('api_url', 'option') . '/campaigns/' . $campaign->id . '/actions/send');
            curl_setopt_array($ch, array(
                CURLOPT_POST => TRUE,
                CURLOPT_RETURNTRANSFER => TRUE,
                CURLOPT_HTTPHEADER => array(
                    'Authorization: apikey '.$authToken,
                    'Content-Type: application/json'
                )
            ));
            $response = curl_exec($ch);
            update_field( 'envoye', $campaign->id, $t_param['post'] );
        }
    }

    public function unsubcribeOne ($mail, $zone)
    {
        $salle = get_post($zone);
        $list = get_field('id_mailchimp', $salle->ID);        
        $authToken = get_field('api_key', 'option');
        
        $ch = curl_init(get_field('api_url', 'option') . '/lists/' . $list . '/members/' . md5($mail));
        curl_setopt_array($ch, array(
            CURLOPT_CUSTOMREQUEST => "DELETE",
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Authorization: apikey '.$authToken,
                'Content-Type: application/json'
            )
        ));
        $response = curl_exec($ch);
        return $response;
    }
}
