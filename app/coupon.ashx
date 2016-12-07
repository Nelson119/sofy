<%@ WebHandler Language="C#" Class="SaveData" %>

using System;
using System.Web;
using System.Data;
using tw.patw;
using Don.Result;
using System.Text.RegularExpressions;

public class SaveData : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
		
		context.Response.ContentType = "application/octet-stream";
        HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=coupon.jpg");
        var wc = new System.Net.WebClient();
        var bin = wc.DownloadData("http://www1.jwttw.com/event/sofy/2016waka/img/coupon.jpg");
        context.Response.OutputStream.Write(bin, 0, bin.Length);
        context.Response.End();

    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}