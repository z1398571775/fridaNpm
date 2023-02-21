console.log('当前运行系统为:' + Script.runtime);
// console.log(`Current android version: ${Script.runtime}`)
Process.enumerateModules().forEach(item => {
    console.log(item.name);
})
//获取Editor基本地址地址信息
var EditorBaseAddr = Process.findModuleByName("010Editor.exe")?.base;
console.log("基本地址为:"+EditorBaseAddr);
var functionAddr = EditorBaseAddr?.add(ptr(0x14036EFA0).sub(0x140000000));
// console.log("测试:"+functionAddr);
console.log("测试1:"+functionAddr);
Interceptor.attach(ptr(Number(functionAddr)), {
    onEnter: function(args) {
        console.log("onEnter");
        var num1 = args[0];
        var num2 = args[1];
        var num3 = args[3];
        console.log("num1: " + num1);
        console.log("num2: " + num2);
        console.log("num3: " + num3);
    },
    onLeave: function(retval) {
        console.log("返回值为:"+retval);
        retval.replace(ptr(219));
    }
});