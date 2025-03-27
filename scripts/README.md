# GamesDwell 游戏数据自动化脚本

这个目录包含了用于管理GamesDwell游戏数据的自动化脚本。你可以使用这些脚本从CSV文件导入游戏数据，或者将现有游戏数据导出为CSV格式，以便进行批量编辑或备份。

## 安装

首先，安装所需的依赖：

```bash
cd scripts
npm install
```

## 使用方法

### 导入游戏数据

1. 准备一个包含游戏数据的CSV文件，参考`games-data.csv`的格式
2. 运行导入脚本：

```bash
npm run import
```

导入脚本会自动将CSV中的游戏数据添加到`app/data/games.ts`文件中，如果游戏ID已存在，则会更新现有游戏数据。

### 导出游戏数据

如果你想将现有游戏数据导出为CSV格式进行编辑或备份，可以运行：

```bash
npm run export
```

脚本会生成一个`games-export.csv`文件，包含所有现有游戏的数据。

## CSV文件格式

导入和导出使用的CSV文件应包含以下列：

- `title` - 游戏标题
- `description` - 游戏描述
- `category` - 游戏分类 (action, puzzle, strategy, sports)
- `iframeUrl` - 游戏iframe的URL
- `thumbnailUrl` - 游戏缩略图URL
- `controls` - 控制说明
- `tags` - 标签，以逗号分隔
- `featured` - 是否为特色游戏 (true 或 false)
- `dimensions` - 游戏分辨率，格式为 "宽x高"，例如 "800x600"
- `developer` - 开发者
- `publisher` - 发行商
- `releaseDate` - 发布日期，格式为 "YYYY-MM-DD"
- `rating` - 评分 (1.0-5.0)
- `ratingCount` - 评分数量
- `minFPS` - 最低FPS
- `targetFPS` - 目标FPS
- `cpu` - 推荐CPU
- `ram` - 推荐内存
- `gpu` - 推荐显卡

## 注意事项

- 脚本会自动生成基于游戏标题的唯一ID
- 如果CSV中未提供某些字段，脚本会使用默认值
- 尺寸字段会自动计算最佳宽高比
- 使用这种方法可以快速添加大量游戏，而不需要手动编辑游戏数据文件

## 示例

参考`games-data.csv`文件，了解如何格式化游戏数据。 