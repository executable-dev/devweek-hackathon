using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FunctionApp
{
    public static class Functions
    {
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo GetSignalRInfo(
            [HttpTrigger(AuthorizationLevel.Anonymous)] HttpRequest req,
            [SignalRConnectionInfo(HubName = "devweek2019")] SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }

        [FunctionName("location")]
        public static Task SendLocation(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] object message,
            [SignalR(HubName = "devweek2019")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "newLocation",
                    Arguments = new[] { message }
                });
        }

        [FunctionName("requestMove")]
        public static Task SendMove(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] object message,
            [SignalR(HubName = "devweek2019")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "moveRequested",
                    Arguments = new[] { message }
                });
        }

        [FunctionName("requestPicture")]
        public static Task RequestPicture(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] object message,
            [SignalR(HubName = "devweek2019")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            
            return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "pictureRequested",
                    Arguments = new[]{ message }
                });
        }

        [FunctionName("sendPicture")]
        public static Task SendPicture(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] object message,
            [SignalR(HubName = "devweek2019")] IAsyncCollector<SignalRMessage> signalRMessages)
        {

                return signalRMessages.AddAsync(
                new SignalRMessage
                {
                    Target = "newPicture",
                    Arguments = new[]{ message }
                });
            
        }
    }
}