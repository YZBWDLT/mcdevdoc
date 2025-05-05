---
sidebar_position: 100
---

# 第三章小结

## 思考问题答案

### 思考 3.2-1

> 直接激活单个的连锁型命令方块，能激活这个命令方块吗？如果一个 CB 链的起点也是连锁型命令方块，能激活这个 CB 链吗？

答案：不能。单个的连锁型命令方块没有任何指向它的命令方块执行，所以激活单个 CCB 是不会有任何反应的。同理地，如果 CB 链的起点是 CCB，因为没有任何指向它的 CB 被执行，所以无论如何这个 CB 链都是无法被激活的。

很多初学者都会在无指导的情况下，使用拉杆等电源直接激活这三种命令方块，结果发现 CCB 是没有任何反应的，所以有些初学者会错认为这种命令方块是没什么效果的，这种想法是不正确的。

### 思考 3.2-2

> 然而，这样做会存在一个问题：当玩家在购买后正好触发了不足条件，比如剩余 4 颗绿宝石后购买，先触发成功条件，变为 1 颗，然后又会触发失败条件，最终导致成功购买后同时出现购买成功和购买失败的提示。如何才能解决这个问题？

答案：将命令 5\~6 和命令 1\~4 调换即可，先判断是否失败，然后再判断是否成功。

```text showLineNumbers title="高亮部分为条件制约型命令方块" {2,4-6}
execute as @p unless entity @s[hasitem={item=emerald,quantity=3..}]
tellraw @p {"rawtext":[{"text":"§c绿宝石不足！"}]}
execute as @p if entity @s[hasitem={item=emerald,quantity=3..}]
clear @p emerald -1 3
give @p golden_apple 15
tellraw @p {"rawtext":[{"text":"成功购买了金苹果 * 15"}]}
```

### 思考 3.2-3

> 根据上文的 RCB 链的运行逻辑，思考在上例中如何调整 RCB 的延迟刻数，才能让 RCB 链每秒稳定输出下一个数，并在达到`1`后重新输出`5`，实现一个循环？

答案：将 RCB 的延迟改为 100 游戏刻。

## 练习问题答案

### 练习 3.2

注意：命令系统的设计并不是唯一的，所以下面的大部分答案也都是不唯一的，仅供参考。命令系统设计的一些优化原则是：能少用命令方块就少用命令方块；能只执行一次的命令就不要重复执行；尽量把开销大的命令（例如`/fill`、`/clone`）分片分时执行等。总之，能少执行就少执行为好。

1. 将给定命令按照下列 RCB 链排列即可：  
   ![answer_1](./img/section2/answer_1.png)
2. 设计下图所示的命令系统：
   ![answer_2](./img/section2/answer_2.png)  
   然后，按编号写入下面的命令，其中`...`分别指代其对应的红石导体的位置：

   ```text showLineNumbers
   setblock ... stone
   setblock ... stone 
   setblock ... stone
   say 本章已完成
   ```

3. 这里采用`data.levelCompleted`来指代关卡完成数。显然，当完成一关后，应该为该值加 1。为了防止一个关卡能重复完成多次，可以采用始终激活 CB 的方式，确保它只执行一次。当关卡完成后，就在一个位置上放上红石块，这可以满足我们的需求。最后，检测到满足条件后，应该执行`say 本章已完成`的命令，但是只能执行一次。

   首先，对于红石块的需求，我们可以采用活塞解决：  
   ![answer_3_1](./img/section2/answer_3_1.png)  
   这里的每个命令方块的命令都是`scoreboard players add levelCompleted data 1`。

   然后，检测到条件满足后执行一次`say 本章已完成`。检测通常是需要循环执行的，而待执行的命令只能执行一次，这是一个经典的矛盾问题。这里有两种可以考虑的方法：

   1. 使用红石比较器连接：  
      ![answer_3_2](./img/section2/answer_3_2.png)  
      其中，RCB 的命令为`execute if score levelCompleted data matches 3..`，CB 的命令为`say 本章已完成`。
   2. 直接在检测成功后停止执行命令：  
      ![answer_3_3](./img/section2/answer_3_3.png)  
      其中，RCB 的命令为`execute if score levelCompleted data matches 3.. run say 本章已完成`，CCB 的命令为`setblock ... air`，其中`...`为红石块的坐标。这种方案的优势在于不会在检测成功后引入额外延迟，但缺点在于待执行的命令不能过于复杂，否则会导致后面的命令方块都带上长长的检测条件，并且因为要中间插入命令方块，也不利于后续维护。

   将关卡完成的活塞装置和上面两种检测装置的任意一种拿出来并组合一下，就得到题意需要的命令系统。

4. 和第 3 问类似，这里同样面临检测的循环和给予物品的单次执行的矛盾。这里我们采用经典的红石比较器的思路。检测到物品后，激活 CB 链，清除玩家的原物品并给予一个新物品。然后，为了防止玩家刷物品，可以在给予后就直接停止检测。这样，我们就得到下图的命令系统：
   ![answer_4](./img/section2/answer_4.png)  
   然后，按编号写入下面的命令，其中`...`指代红石块的位置：

   ```text showLineNumbers
   execute if entity @a[hasitem={item=crafting_table}]
   clear @a crafting_table
   give @a crafting_table 1 0 {"can_place_on":{"blocks":["emerald_block"]}}
   setblock ... air
   ```

   视情况，可以继续优化这个逻辑，例如多人适配、或者添加提示语、音效等。

5. 这里可以结合红石系统。此处，设计了如下图的一种感应门，当玩家到 RCB（`testfor @a[y=~2,dy=0]`）上方 2 格时，门会自动打开。注意：这里此时只有一名玩家，所以必须使用红石中继器延续信号。
   ![answer_5](./img/section2/answer_5.png)

6. 这一问的要求开始变得复杂起来，主要是因为这是实际工程中常用的与 NPC 交互的逻辑。首先，我们需要明确目标：我们要实现村民的检测，然后后续调整权限、传送、对话这些操作都只需要执行一次即可。只需要将我们后续那个比较复杂的需求按顺序写成一个 CB 链即可解决。为此，我们还是设计如下图的命令系统：
   ![answer_6](./img/section2/answer_6.png)
   然后，按编号写入下面的命令，其中第 6~11 个命令方块应设置为 80 刻的延迟刻数：

   ```text showLineNumbers
   execute as @e[type=villager] at @s if entity @a[r=3]
   execute as @e[type=villager] at @s run tp @a ^^^3
   execute as @a at @s run tp @s ~~~ facing @e[type=villager,c=1]
   inputpermission set @a movement disabled
   inputpermission set @a camera disabled
   execute as @e[type=villager] run say 这是第一句话
   execute as @e[type=villager] run say 这是第二句话
   execute as @e[type=villager] run say 这是第三句话
   execute as @e[type=villager] run say 这是第四句话
   execute as @e[type=villager] run say 这是第五句话
   inputpermission set @a movement enabled
   inputpermission set @a camera enabled
   ```

   命令逻辑是比较简单的，这里不再详细解析。无法理解上述命令含义的读者请回顾第 2 章的内容。

7. 这个问题非常简单，命令方块写入`setblock ~~1~ air`即可。通常来说，结合 CB 链可以实现多次的 CB 链调用，例如下图的结构中可以通过多次放置红石块的方式来多次调用这个 CB 链，因此这种结构是一种很常见的扩展版 CB 链结构。  
   ![answer_7](./img/section2/answer_7.png)

8. 不使用记分板检查玩家，可以使用`/testfor @a`+红石比较器检测的方法。注意：这里不能使用`/execute if entity @a`了，因为这条命令的执行成功次数固定为 1。
   ![answer_8](./img/section2/answer_8.png)  
   注意红石线路的长度为 14。然后，按编号写入下面的命令，其中第 2 个命令方块应该设置为 20 刻的延迟刻数：

   ```text showLineNumbers
   testfor @a
   scoreboard players remove startCountdown time 1
   ```

9. 这里我们需要检测玩家是否扔出钓竿，然后执行单次的命令。很经典的循环与单次的矛盾，所以采用红石比较器结构。检测钓竿可以使用`execute if entity`命令检查浮漂，然后检查到之后将距离浮漂最近的玩家传送，并立刻移除浮漂以防误判，这就是最基础的“钓竿回城”了。
   ![answer_9_1](./img/section2/answer_9_1.png)

   ```text showLineNumbers
   execute if entity @e[type=fishing_hook]
   execute as @e[type=fishing_hook] at @s run tp @p 0 128 0
   kill @e[type=fishing_hook]
   ```

   不过这样做，会导致额外的延迟。事实上我们注意到，在我们这个思路的最后，移除了浮漂，**这直接影响了一开始的检测条件**，所以哪怕后面两条命令循环执行，最后的传送效果也是单次的传送。所以，这个思路可以继续优化为
   ![answer_9_2](./img/section2/answer_9_2.png)

   ```text showLineNumbers {2} title="高亮部分为条件制约型命令方块"
   execute as @e[type=fishing_hook] at @s run tp @p 0 128 0
   kill @e[type=fishing_hook]
   ```

   这里不使用条件制约也是可以的，这个小优化只是为了每游戏刻少执行一些命令而已。

10. 商店的逻辑已在实验 3.2-8 中讲过，这里不再赘述，直接给出命令系统和答案。
    ![answer_10](./img/section2/answer_10.png)

    ```text showLineNumbers {2,4-6} title="高亮部分为条件制约型命令方块"
    execute as @p unless entity @s[hasitem={item=rotten_flesh,quantity=36..}]
    tellraw @p {"rawtext":[{"text":"§c腐肉不足！"}]}
    execute as @p if entity @s[hasitem={item=rotten_flesh,quantity=36..}]
    clear @p rotten_flesh -1 36
    give @p emerald 1
    tellraw @p {"rawtext":[{"text":"成功购买了绿宝石 * 1"}]}
    ```

    顺带一提，可以将实验 3.2-8 中第 1\~2 条命令和第 3\~6 条命令调换的理论基础，也是检测条件会在物品清除时被更改。请注意，**要格外关注检测条件会在执行逻辑中被更改的问题，这往往会导致一系列的意外问题**。

11. 这里首先要进行玩家的维度检测，这在我们讲记分板（练习 2.4-3 第 8 题）的时候曾经提过，可以用`dimension.@s`记录玩家的维度信息，然后基于`execute in`和`rm`目标选择器参数来进行检测：
    ![answer_11_1](./img/section2/answer_11_1.png)

    ```text showLineNumbers
    execute in overworld run scoreboard players set @a[rm=0] dimension 0
    execute in nether run scoreboard players set @a[rm=0] dimension 1
    execute in the_end run scoreboard players set @a[rm=0] dimension 2
    ```

    接下来，我们需要找到刚进下界的玩家，将其传送到(0,128,0)。我们可以想到，只要检测到`dimension.@s`不为`1`的玩家在下界里面，不就是刚进下界么？但是，单开一个 RCB 链却不太现实，因为我们不敢保证是上面的 RCB 链先执行还是我们新加的 RCB 链先执行。所以，我们必须基于上面的 RCB 链进行改进，在第一个命令方块前面新增检测和传送命令，然后再更改状态，就能保证先后的逻辑问题。综上，答案为  
    ![answer_11_2](./img/section2/answer_11_2.png)

    ```text showLineNumbers
    execute in nether run tp @a[rm=0,scores={dimension=!1}] 0 128 0
    execute in overworld run scoreboard players set @a[rm=0] dimension 0
    execute in nether run scoreboard players set @a[rm=0] dimension 1
    execute in the_end run scoreboard players set @a[rm=0] dimension 2
    ```

    注意为保证这个命令系统在维度切换的时候依然能正常运行，必须使用`/tickingarea`添加一个常加载区域，使这个 CB 链常加载。在这里，基于命令方块的命令系统的一些弊端可以说是已经初见端倪，你已经能看到基于已经成型的命令方块进行改进还是有些麻烦的，尤其是中间插入命令的时候。所以，事先做好命令设计还是比较重要的。

12. 这题很简单，用`tp`命令就好了。注意命令方块的上下文，所以需要套一个`execute`。综上，答案为：
    ![answer_12](./img/section2/answer_12.png)

    ```text showLineNumbers
    execute as @e[type=armor_stand] at @s run tp @s ~~~ ~1
    ```

    更改`~1`为别的值可以变换自转的角速度，而改为负数则可以变换旋转方向。

13. 新增一个 T 显即可。答案为：
    ![answer_13](./img/section2/answer_13.png)  
    新增的 CCB 的命令：

    ```text showLineNumbers
    titleraw @a actionbar {"rawtext":[{"translate":"§c%%s§e秒后开始游戏！","with":{"rawtext":[{"score":{"objective":"time","name":"startCountdown"}}]}}]}
    ```

14. 同理地，检测用`/execute if blocks`，而执行脉冲 CB 链只执行一次，所以用红石比较器结构。
    ![answer_14](./img/section2/answer_14.png)  
    具体命令不再给出，因为题干并没有明确指定确定的空区域，读者能够理解其中的意思即可。
