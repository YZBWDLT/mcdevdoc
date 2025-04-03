---
sidebar_position: 100
---

# 第二章小结

## 思考问题答案

:::info[思考 2.2-1：为什么`数据值`必须代表损坏值而不能代表耐久值？]

> 为什么这里必须代表损坏值而非耐久值呢？

我们反过来想，如果是耐久值会出现什么后果？例如`/give @s diamond_sword`，这样的话，因为数据值默认为`0`，所以它会给你一把已经几乎没有耐久的剑，这并非我们预期的结果。不同的工具，耐久值都大不相同，如果要给一把满耐久的工具，就必须记住它的满耐久值；而且，实际应用中也是给予满耐久工具的情况居多。因此，数据值就必须代表损坏值。

顺带一提，在 Java 版中，物品并没有数据值一说（详见上文关于物品数据值的历史问题），损坏值是用物品组件来指代的。可能在基岩版未来的某一天，数据值也会被移除，其中的特殊数据可能就会用`组件`来代替。不过可以肯定的是，现在离那一天应该还早。

:::

:::info[思考 2.2-2]

> `/give`能否给予一个负数值数据值的物品，例如`/give @a apple 1 -1`？试分析之并在游戏中验证你的想法。

答案是：不能。否则，`/give @a apple 1 -1`的含义就将变为给予所有玩家一个*任意数据值*的物品。反正换作让你干这活，你也得懵，所以游戏只能报错。给予一个物品必须给定一个特定的数据值，而不能是任意的数据值，这道理是很简单的。

:::

:::info[思考 2.2-3]

> 如果`m`能够指定多次，`@a[m=creative,m=survival,m=spectator]`能否实现`@a[m=!adventure]`相同的效果？

答案是：不能。这个目标选择器无论如何也找不到这样的玩家：既是创造模式、又是生存模式、又是旁观模式。不要忘记：**目标选择器参数之间的关系是“和”的关系，而不是“或”**。

:::

:::info[思考 2.2-4]

> 按照前文的逻辑，你能否分析`/tp Alex`的含义？提示：该命令中，`Alex`并不是`目标`。

答案：该命令将传送自己到 Alex 的位置上去。因为我们在前文中说，`目标`只要为`@s`时，这些命令就和没有`目标`的另外 5 条语法等价。

考虑到 5 条扩展语法中，都至少需要接收 2 个必选参数，而在这条命令中只给定了 1 个参数`Alex`，说明这里用的应当是不含`目标`的语法：

```text title="/tp传送执行者的语法" showLineNumbers
/tp <位置: target>
/tp <位置: x y z> [检查卡墙: Boolean]
/tp <位置: x y z> [y旋转: value] [x旋转: value] [检查卡墙: Boolean]
/tp <位置: x y z> facing <面向实体: target> [检查卡墙: Boolean]
/tp <位置: x y z> facing <面向坐标: x y z> [检查卡墙: Boolean]
```

其中，第一个参数接受`target`的语法，仅有`/tp <位置: target>`符合条件。因此，该命令将传送自己到 Alex 的位置上去。

需要注意的是，这条命令经常容易和`/tp <目标: target> <位置: target> [检查卡墙: Boolean]`搞混，尤其是在使用游戏给的 UI 时，即使不指定“何处”玩家，也能够成功执行，并且一般执行效果都是背离执行者的预期的（即误将待传送人指定为执行者，而传送位置误指定为待传送人的位置）。

![/tp的UI](./img/section2/tp_ui.png)

:::

## 练习问题答案

:::info[练习 2.2]

1. `/give @a[m=survival,rxm=85] dandelion 10`。注意低头的 x 旋转值范围为 85~90，所以我们需要指定`rxm`最小值为 85，而最大值 90 是永远不可能达到的，所以无需指定。
2. `/clear (玩家) dandelion -1 10`，数据值写为`0`亦可，因为一般而言，默认状态下的物品的数据值都是`0`。
3. （1）可行。因为玩家没有钻石时，`/clear`将执行失败；有 1 个钻石时，`/clear`将清除玩家的 1 个钻石并成功执行，因此能够按照预期执行；有大于 1 个钻石时，`/clear`将至多清除 1 颗钻石并成功执行，也能够按照预期执行。上述情况全部可以按照预期执行，因此可行。  
（2）不可行。玩家没有钻石时和玩家的钻石数量大于等于 2 时，这个逻辑都按照预期执行。然而，若玩家只有 1 颗钻石时，命令同样成功执行，这时玩家只需要用 1 颗钻石即可兑换，背离预期。在以前没有`hasitem`的时代，这也是在进行大数量清除时不能直接使用这套逻辑做商店的根本原因。
4. `/tp @a ~~~ -135 0`或`/tp @a ~~~ 225 0`，当然这条命令将会导致玩家的位置改变到你的位置上，不过正视东北方向还是正视了的。
5. `/weather clear`、`/time set noon`（为白天范围即可）
6. 命令 A：`/gamemode survival @a[m=creative]`  
命令 B：`/say §c你不能开启创造模式！`  
7. `/gamemode creative @a[m=spectator,rx=-85]`。注意抬头的 x 旋转值范围为 -90~-85，最小值为 -90 不可能达到，所以无需指定`rxm`；而最大值 -85 则用`rx=-85`指定。
8. `/kill @e[type=item]`

:::

:::info[练习 2.3-1]

1. `/execute as @a at @s run tp @s ~~~ -135 0`
2. `/execute as @e[type=enderman] at @s as @a[r=5] anchored eyes run tp @s ~~~`，注意末影人周围 5 格是针对其脚部位置而言的。
3. `/execute as @e[type=villager] at @s run kill @e[type=zombie,r=5]`
4. `/execute as @e[type=zombie] at @s rotated as @e[type=villager,name=Alex,c=1] run tp @s ~~~ ~~`（注意千万不要忘记后面的`~~`，更改执行朝向不等同于更改执行者的朝向！）
5. `/execute as @e[type=villager] at @s align xz positioned ~0.5~~0.5 run summon zombie`
6. `/execute as @e[type=sheep] at @s positioned as @e[type=cow,c=1] facing entity @e[x=0,y=0,z=0,c=1,type=pig] feet run tp @s ~~~~~`  
  或`/execute as @e[type=sheep] at @s positioned as @e[type=cow,c=1] run tp @s ~~~ facing @e[x=0,y=0,z=0,c=1,type=pig]`，答案不唯一。
7. 从左向右分析。  
第一条命令先更改执行者为所有实体，后更改执行环境参数为执行者的环境参数，执行将所有执行者向前传送 1 格的命令，因此该命令的含义为*将所有实体向其前方传送 1 格*。  
第二条命令的`at @s`没什么意义，可忽略（因为执行环境参数本身就已经是执行者的环境参数了），然后设置执行者为所有实体，执行将所有执行者向前传送 1 格的命令，因此该命令的含义为*将所有实体传送到原执行者前方 1 格*。
8. 进入下界：`/execute in nether run tp @s ~~~`  
  检测下界生物：`/execute in nether as @e[rm=0] run say 你们好，主世界的生物们！`
9. 命令 1：`/execute as @a[x=0,y=-60,z=0,r=1] run gamemode survival @s[m=creative]`  
  命令 2：`/execute as @a[x=0,y=-60,z=0,r=1] run tp 0 -60 3`  
  倒转后，因为先执行了`tp`命令导致玩家位置发生变化，一定会致使目标选择器检测失败，从而使得`gamemode`无法执行。因此，如果两条命令的顺序倒转，就无法再实现预定效果。

:::

:::info[练习 2.3-2]

1. `/execute if blocks -1 22 85 -1 22 85 10 5 7 all unless entity @e[type=item] if entity @e[type=skeleton] run say 恭喜你获取进度！`  
  其中，`if blocks`写为`10 5 7 10 5 7 -1 22 85`也是正确的。
2. `/execute if block 73 0 -64 green_wool run say 恭喜你们获取了绿色羊毛，你离通关更近了一步！`
3. `/execute as @a at @s if block ~~-1~ red_concrete run kill @s`
4. `/execute if blocks 0 0 0 30 20 30 10000 0 10000`，答案合理即可。注意检测点的最高高度不得高于 300，因为该检测区域高达 20 格。
5. 命令 1：`/execute positioned 0 -60 0 if entity @a[r=2,hasitem={item=tripwire_hook}] run setblock 0 -61 0 redstone_block`  
  命令 2：`/execute positioned 0 -60 0 as @a[r=2,hasitem={item=tripwire_hook}] run clear @s tripwire_hook`  
  答案不唯一，合理即可。
6. `/execute if blocks -50 19 92 -50 19 92 -54 10 87 if block 19 22 7 cyan_terracotta run say [C3]通过本关后将获得纪念品[金锭]`
7. `/execute positioned -244 32 23 if entity @e[r=2,type=snowball] run tp @a ~~-2~ 180 0`

:::

:::info[练习 2.4-1]

1. 命令 1：`/execute as @e[type=snowball] at @s run tag @p[r=2] add menu`  
   命令 2：`/kill @e[type=snowball]`  
2. 命令 1：`/tag @a remove isAlive`  
   命令 2：`/tag @e[type=player] add isAlive`  
   命令 3：`/execute if entity @e[tag=!isAlive] run setblock 56 43 -79 redstone_block`
3. 命令 1：`give @a[tag=hasPickaxeUpgrade] diamond_pickaxe`  
   命令 2：`give @a[tag=!hasPickaxeUpgrade] iron_pickaxe`

:::

:::info[练习 2.4-2]

1. `/scoreboard objectives add time dummy "时间数据"`或`/scoreboard objectives add timeData dummy "时间数据"`
2. `/scoreboard objectives setdisplay sidebar time`或`/scoreboard objectives setdisplay sidebar timeData`
3. `/scoreboard objectives remove time`或`/scoreboard objectives remove timeData`

:::

:::info[练习 2.4-3]

1. `/execute if entity @a[tag=isAlive] if entity @a[tag=isInNether] run scoreboard players set advTemp data 0`
2. `/scoreboard players add tick time 1`
3. `/scoreboard players random luckyBlockEvent data 1 47`，只要范围内的数为 47 个即可。如果从 0 开始，应设置为`0 46`。
4. 1. `/scoreboard players add @a isOnline 0`  
   2. `/scoreboard players remove * isOnline`，**注意实际工程中一定要指代`isOnline`，否则将波及到其他记分板**！  
   3. `/scoreboard players set @a isOnline 1`  
   4. 退出重进玩家的`isOnline.@s`=`0`，应在第一条命令执行后执行该命令，因为在后两条命令中，将会影响所有玩家，使筛选出的分值的信息丢失。  
5. `/scoreboard players operation x data *= x data`
6. 1. `/scoreboard players operation x data += x data`  
   2. 不能用一条命令实现。可以用两条命令实现之：  
      1. `/scoreboard players set const10 data 10`
      2. `/scoreboard players operation x data *= const10 data`
7. 1. `/scoreboard players operation c data = a data`
   2. `/scoreboard players operation c data += b data`
8. 写三条命令，要求：  
   1. `/execute as @a at @s if block 0 -64 0 bedrock if block 0 128 0 air run scoreboard players set @s dimension 0`
   2. `/execute as @a at @s if block ~~-1~ netherrack run scoreboard players set @s dimension 1`
   3. `/execute as @a in the_end if entity @s[rm=0] run scoreboard players set @s dimension 2`
   显然，第 3 种原理更好，因为它不需要依靠任何外部条件（即世界中的方块），它们随时可能会被更改导致检测出现偏差。
9. `/execute if entity @a[tag=teamRed,hasitem={item=emerald}] run scoreboard players operation @r[tag=teamRed] data >< @r[tag=teamBlue] data`
10. `/scoreboard players operation teamRed teamScore -= teamBlue bedAmount`
11. 题目中出现了 3 个常数：3、-5和 100，先分别定义之：  

   ```mcfunction showLineNumbers
   /scoreboard players set const3 data 3
   /scoreboard players set const-5 data -5
   /scoreboard players set const100 data 100
   ```

   然后，分别计算第一项、第二项和第三项：

   ```mcfunction showLineNumbers
   /scoreboard players operation firstTerm data = x data
   /scoreboard players operation firstTerm data *= firstTerm data
   /scoreboard players operation firstTerm data *= firstTerm data
   /scoreboard players operation firstTerm data *= const3 data

   /scoreboard players operation secondTerm data = x data
   /scoreboard players operation secondTerm data *= const-5 data

   /scoreboard players operation thirdTerm data = const100 data
   /scoreboard players operation thirdTerm data /= x data
   ```

   最后，分别相加之：

   ```mcfunction showLineNumbers
   /scoreboard players operation y data += firstTerm data
   /scoreboard players operation y data += secondTerm data
   /scoreboard players operation y data += thirdTerm data
   ```

12. 对于这种数值分解，基本思路是：  
    （1）对于个位数，直接用 10 取模，例如 456%10=45……6，很快得到个位数 6；  
    （2）对于十位数，先用 10 整除，例如 456/10=45，然后将这个数用 10 取模，例如 45%10=4……5，得到十位数 5；  
    （3）对于百位以上数，直接用 100 整除，例如 3456/100=34，得到百位以上数字 34；  
    基于此，可以写出如下的代码。  

   ```mcfunction showLineNumbers
   # 定义常量 10 和 100
   /scoreboard players set const10 data 10
   /scoreboard players set const100 data 100
   # 个位数：data.gameId%10
   /scoreboard players operation singleDigit data = gameId data
   /scoreboard players operation singleDigit data %= const10 data
   # 十位数：data.gameId/10%10
   /scoreboard players operation demicalDigit data = gameId data
   /scoreboard players operation demicalDigit data /= const10 data
   /scoreboard players operation demicalDigit data %= const10 data
   # 百位数：data.gameId/100
   /scoreboard players operation hundredthDigit data = gameId data
   /scoreboard players operation hundredthDigit data /= const100 data
   ```

   事实上，这就是《冒险小世界：剑之试炼》使用的数值分解方法。

:::
